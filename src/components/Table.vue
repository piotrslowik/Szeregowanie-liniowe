<template>
    <v-card>
        <v-card-title>
            <p>
                Dane wejściowe
            </p>
            <v-spacer />
            <v-slide-y-transition>
                <v-switch
                    v-if="isTableInited"
                    v-model="dense" 
                    label="układ gęsty"
                />
            </v-slide-y-transition>
            <span class="mx-3" />
            <v-slide-y-transition>
                <NewColumnDialog v-if="isTableInited" />
            </v-slide-y-transition>
            <span class="mx-1" />
            <v-slide-y-transition>
             <NewRowDialog v-if="isTableInited" />
            </v-slide-y-transition>
        </v-card-title>
        <v-card-text
            class="px-0"
        >
            <v-data-table
                :dense="dense"
                :headers="headers"
                :items="items"
            >
                <template #no-data>
                    <v-scale-transition>
                        <Start v-if="!isTableInited" />
                    </v-scale-transition>
                </template>
                <template #item.action="{ item }">
                    <div class="d-flex">
                        <TooltipIcon
                            @click="editItem(item)"
                            color="primary"
                            normal
                            :large="!dense"
                            icon="mdi-pencil-outline"
                        >
                            Edytuj
                        </TooltipIcon>
                        <v-spacer />
                        <TooltipIcon
                            @click="deleteItem(item)"
                            color="red"
                            icon="mdi-delete-circle-outline"
                            normal
                            :large="!dense"
                        >
                            Usuń
                        </TooltipIcon>
                    </div>
                </template>
            </v-data-table>
        </v-card-text>
        <EditRowDialog
            v-model="showEditRowDialog"
            :row="itemToEdit"
        />
    </v-card>
</template>

<script lang="ts">
import TooltipButton from './common/TooltipButton.vue';
import NewColumnDialog from './dialogs/NewColumnDialog.vue';
import NewRowDialog from './dialogs/NewRowDialog.vue';
import EditRowDialog from './dialogs/EditRowDialog.vue';
import TooltipIcon from './common/TooltipIcon.vue';
import Start from './Start.vue';

import { Column, Row } from '@/classes';

import { MUTATIONS as M} from '@/store/mutation-types';
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
        TooltipButton,
        NewColumnDialog,
        NewRowDialog,
        TooltipIcon,
        EditRowDialog,
        Start,
    },
})
export default class Table extends Vue {
    showEditRowDialog = false;
    dense = true;
    itemToEdit = {};
    get isTableInited(): boolean {
        return this.$store.getters.isTableInited; 
    }
    get columns(): Column[] {
        return this.$store.getters.columns;
    }
    get headers() {
        return [...this.columns, {
            text: '',
            value: 'action',
            width: '90',
            sortable: false,
        }];
    }
    get rows(): Row[] {
        return this.$store.getters.rows;
    }
    get items() {
        return this.rows.map(row => ({
            id: row.id,
            name: row.name,
            ...row.values,
            }
        ));
    }
    deleteItem(item: Row) {
        this.$confirm(`Czy chcesz usunąć wiersz ${item.name}?`)
            .then(() => {
                this.$store.commit(M.deleteRow, item);
            })
            .catch(() => {})
    }
    editItem(item: Row) {
        this.showEditRowDialog = true;
        this.itemToEdit = item;
    }
}
</script>