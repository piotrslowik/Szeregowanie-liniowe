import Vue from 'vue';
import Vuetify from 'vuetify';

import colors from 'vuetify/lib/util/colors'
import pl from 'vuetify/src/locale/pl'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.indigo.accent3,
                secondary: colors.blue.darken1,
                error: colors.red.base,
                success: colors.green.base,
                background: colors.grey.lighten4,
            },
            dark: {
                primary: colors.indigo.base,
                secondary: colors.blue.darken3,
                error: colors.red.accent3,
                success: colors.green.accent3,
                background: colors.grey.darken3,
            },
        },
    },
    lang: {
        locales: { pl },
        current: 'pl',
    },
})
