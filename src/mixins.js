export default {
    /*
        Ici, on retrouve les mixins, c'est à dire les méthodes disponibles à tous les composants du projet
     */
	methods: {
		convertOunceToGram(value) {
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
            switch (term) {
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
	}
};