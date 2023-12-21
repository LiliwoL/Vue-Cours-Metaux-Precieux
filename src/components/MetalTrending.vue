<template>
	<main
		class="flex flex-col space-y-10 items-center justify-center h-screen w-screen rounded-md bg-amber-300"
	>
		<h1 class="text-3xl font-bold">
			Cours des métaux {{ formatDate( date ) }}
		</h1>

		<div class="flex flex-col justify-center">
			<ul class="bg-white rounded border border-gray-200 w-96 text-gray-900">
				<li
					:key="index" v-for="(rate, index) in rates"
					class="px-6 py-2 border-b border-gray-200 w-full rounded hover:bg-blue-700 hover:shadow-lg
						focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0
						active:bg-blue-300 active:shadow-lg
						transition duration-150 ease-in-out"
					data-bs-toggle="modal" data-bs-target="#exampleModal"

					@click="setData(index, rate)"
					>
					<!-- Mise à jour de dataEncours au clic -->
						<div class="font-semibold text-sm sm:text-base items-center">
							{{ convertMetalsTerms( index ) }}
						</div>
						<div class="text-right">
							{{ formatEuro( convertTroyOunceToGram( rate )) }} / g
						</div>

				</li>
			</ul>
		</div>


		<!-- Modal -->
		<ModalCalculator :data="dataEnCours" :refresh="refresh"></ModalCalculator>

	</main>

</template>

<script>
import moment from 'moment'
import ModalCalculator from './ModalCalculator.vue';
import myMixins from '../mixins';

export default {
    name: "MetalTranding",
    data() {
        return {
          rates: undefined,
          date: new Date(),
          dataEnCours: {
            metal: '',
            rate: 0
          },

          // API EndPoint
          api_key:      process.env.VUE_APP_API_KEY,
          api_endpoint: process.env.VUE_APP_API_ENDPOINT,
          api_options:  process.env.VUE_APP_API_OPTIONS
        };
    },
    /**
     * Ne surtout pas utiliser de fonctions fléchées ici!
     * On perdrait le this!
     *
     * Erreur fréquente !
     */
    mounted() {
        fetch(
            // Metal Price API
            //https://api.metalpriceapi.com/v1/latest?api_key=XXXXXXXXX&base=EUR&currencies=XAU,XAG,XPD,XPT,XRH
            // Metal API
            //https://metals-api.com/api/latest?access_key=XXXXXXXXXXXXXXXX&base=EUR&symbols=XAU,XAG,XPD,XPT,XRH

          this.api_endpoint + this.api_key + this.api_options,

            // LOCAL (en cas de dépassement du nombre de requêtes)
            //"metals.json",
          {
                headers: {
                  //'Content-Type': 'application/json'
                  // like application/json or text/xml
                }
            }
        )
        .then(response => {
            //console.log(response);
            // Ne pas oublier le return!
            return response.json();
        })
        .then(data => {
            //console.log(data);

            // Mise à jour des data
            this.date = new Date(data.timestamp * 1000);
            this.rates = data.rates;

            // Stockage en local
            window.localStorage.setItem('metal-rates-date', new Date().toString() );
            window.localStorage.setItem('metal-rates', JSON.stringify(this.rates));
        })
        .catch(error => {
            console.log("Erreur de récupération API " + error);

            console.log("Tentative de récupération LocalStorage");
            this.date = new Date( window.localStorage.getItem('metal-rates-date') );
            this.rates = JSON.parse(window.localStorage.getItem('metal-rates'));
        });
    },
    methods:
    {
      setData(metal, rate)
      {
        this.dataEnCours = { metal: metal, rate: rate};
        //console.log(this.dataEnCours);
      },
      // Filtre d'affichage (les filtres de Vue2 sont dépréciés)
      // Il faut au préalable avoir tapé: npm install moment --save
      formatDate(date)
      {
        if (date instanceof Date) {
            return moment(date).locale("fr").calendar().toLowerCase();
        }
        else {
            return "";
        }
      },
      convertOunceToGram(value)
      {
        // Conversion en nombre
        let n = parseFloat(value);
        // 1 once = 28.349 grammes
        return (n / 28.349);
      },
      formatEuro(amount) {
        // Conversion en nombre
        let n = parseFloat(amount);
        // Arrondi à 2 décimales
        return n.toFixed(2) + " €";
      },
      convertMetalsTerms(term) {
        let value = "";
        switch (term)
        {
          case "XAG":
            value = "Argent";
            break;
          case "XAU":
            value = "Or";
            break;
          case "XPD":
            value = "Palladium";
            break;
          case "XRH":
            value = "Rhodium";
            break;
          case "XPT":
            value = "Platine";
            break;
        }
        return value;
      }
    },
	mixins: [myMixins],
    components: { ModalCalculator }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
