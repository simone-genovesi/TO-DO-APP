<template>
    <div class="albo">
        <template>
            <v-card :loading="loading" class="mx-auto my-12" max-width="374">
                <template slot="progress">
                    <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                </template>

                <v-img max-height="250"
                       max-width="374"
                       :src="comic ? comic.img : ''">
                </v-img>

                <v-card-title>{{ comic ? comic.safe_title : "Caricamento" }}</v-card-title>

                <v-card-text>
                    <v-row align="center" class="mx-0">
                        <div class="grey--text ms-4">
                            N° • {{ comic ? comic.num : '' }}
                        </div>
                    </v-row>

                    <div class="my-4 text-subtitle-1">
                        {{ comic ? `${comic.day}/${comic.month}/${comic.year}` : '' }}
                    </div>
                        
                    <div>
                        {{ comic ? comic.transcript : '' }}
                    </div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-title>Tonight's availability</v-card-title>

                <v-card-text>
                    <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
                        <v-chip>5:30PM</v-chip>

                        <v-chip>7:30PM</v-chip>

                        <v-chip>8:00PM</v-chip>

                        <v-chip>9:00PM</v-chip>
                    </v-chip-group>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="deep-purple lighten-2" text @click="reserve">
                        Reserve
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </div>
</template>
  
<script>
export default {
    data: () => ({
        loading: false,
        selection: 1,
        defaultPage: 100,
    }),

    methods: {
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
    },
    created() {
        this.$store.dispatch('fetchComic');
    },
    computed: {
        comic() {
            return this.$store.state.comic;
        },
  },
}
</script>