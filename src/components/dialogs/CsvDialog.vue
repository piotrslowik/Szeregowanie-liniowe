<template>
    <v-dialog
        v-model="dialog"
        width="500"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
            >
                Wczytaj CSV
                <v-icon right>
                    mdi-file-delimited-outline
                </v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                Wczytaj plik CSV
            </v-card-title>
            <v-card-text>
                <p>
                    Plik CSV powinien przyjąć następującą strukturę:
                </p>
                <p>
                    Obiekt;Zmienna1;Zmienna2;Zmienna3<br />
                    Nazwa1;Wartość1_1;Wartość1_2;Wartość1_3<br />
                    Nazwa2;Wartość2_1;Wartość2_2;Wartość2_3<br />
                    Nazwa3;Wartość3_1;Wartość3_2;Wartość3_3<br />
                </p>
                <p>
                    Znakiem oddzielenia komórek może być zarówno średnik jak i dwukropek. Wiersze powinny się kończyć znakiem nowej linii.
                <p>
                    Aby zachować polskie znaki formatowanie pliku powinno zostać ustalone na UTF-8 lub UTF-8 with BOM.<br />
                    Część dziesiętna od ułamkowej powinna być oddzielona kropką, nie przecinkiem.
                </p>
            </v-card-text>
            <v-card-actions>
                <ValidationObserver ref="Validator" style="width: 100%;">
                    <ValidationProvider
                        v-slot="{ errors, valid }"
                        name="csv"
                    >
                        <v-file-input
                            label="Plik"
                            accept=".csv"
                            @change="loadCsv"
                            name="csv"
                            :error-messages="errors"
                            :success="valid"
                        />
                    </ValidationProvider>
                </ValidationObserver>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { ACTIONS } from '@/store/action-types';

export default {
    name: 'CsvDialog',
    data() {
        return {
            dialog: false,
        };
    },
    methods: {
        loadCsv(file) {
            if (window.FileReader) {
                if (file) this.getAsText(file);
            } else {
                this.$refs.Validator.setErrors({csv: 'Ta przeglądarka nie obsługuje odczytu plików'});
            }
        },
        getAsText (file) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = this.loadHandler;
            reader.onerror = this.errorHandler;
        },
        loadHandler(event) {
            const csv = event.target.result;
            const lines = csv.split(/\r\n|\n/);
            lines.pop(); // deleting empty line since a csv file ends with a splitter
            const rows = lines.map(el => el.split(/:|;/));
            this.processRows(rows);
        },
        errorHandler(error) {
            this.$refs.Validator.setErrors({csv: error});
        },
        processRows(rows) {
            try {
                const headers = rows.shift();
                this.$store.dispatch(ACTIONS.loadFromCsv, {
                    headers,
                    rows,
                });
                this.dialog = false;
            } catch (error) {
                this.$refs.Validator.setErrors({csv: error.message});
            }
        },
    },
};
</script>