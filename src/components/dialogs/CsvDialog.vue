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
                Wczytaj plik Csv
            </v-card-title>
            <v-card-text>
                Plik CSV powinien [[[[DODAĆ TEKST]]]]
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
                this.getAsText(file);
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
            const allTextLines = csv.split(/\r\n|\n/);
            const lines = allTextLines.map(el => el.split(/:|;/))
            lines.pop(); // deleting empty line
            console.table(lines)
        },
        errorHandler(error) {
            this.$refs.Validator.setErrors({csv: error});
        },
    },
};
</script>