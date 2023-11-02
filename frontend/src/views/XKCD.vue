<template>
    <div class="albo">
        <template>
            <v-card class="mx-auto my-12" max-width="374">
                <template slot="progress">
                    <v-progress-linear color="teal" height="10" indeterminate></v-progress-linear>
                </template>

                <v-img max-height="550"
                       max-width="384"
                       :src="comic ? comic.img : ''">
                </v-img>

                <v-card-title>{{ comic ? comic.safe_title : "Caricamento..." }}</v-card-title>

                <v-card-text>
                    <v-row align="center" class="mx-0">
                        <div class="grey--text ms-4">
                            N° • {{ comic ? comic.num : '' }}
                        </div>
                    </v-row>

                    <div class="my-4 text-subtitle-1">
                        {{ comic ? `${comic.day}/${comic.month}/${comic.year}` : '' }}
                    </div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-actions>
                    <v-btn 
                        color="teal lighten-2"  
                        large
                        depressed
                        @click="pageMinus">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="teal lighten-2"  
                        large
                        depressed
                        @click="pagePlus">
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </div>
</template>
  
<script>
export default {
    data: () => ({
        num: 100
    }),

    methods: {
        pagePlus() {
            this.num++;
            this.fetchComicData();
        },
        pageMinus() {
            this.num--;
            this.fetchComicData();
        },
        fetchComicData() {
            // Imposta un timeout di 2 secondi (2000 millisecondi) tra le richieste. Occhio al numero di richieste, dopo un po' darà errore "429 (Too Many Requests)"
            setTimeout(() => {
                this.$store.dispatch('fetchComic', this.num)
                .then(() => {
                    console.log(this.num)
                })
                .catch((error) => {
                    console.error('Errore nella richiesta XKCD:', error);
                });
            }, 2000);
            
        },
    },
    created() {
        this.$store.dispatch('fetchComic', this.num);
    },
    computed: {
        comic() {
            return this.$store.state.comic;
        },
  },
}
</script>