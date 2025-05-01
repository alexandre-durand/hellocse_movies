import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

export default defineVuetifyConfiguration({
    theme: {
        defaultTheme: "light",
        themes: {
            light: {
                colors: {
                    primary: 'rgb(21 142 189)',
                    'on-primary': 'rgb(255 255 255)',
                    'on-surface': 'rgb(0 70 96)',
                },
            },
        },
    }
})