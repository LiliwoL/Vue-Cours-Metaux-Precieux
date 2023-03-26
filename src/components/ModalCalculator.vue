<template>
  <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
		id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog relative w-auto pointer-events-none">
				<div
				class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
					<div
						class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
						<h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
							{{ convertMetalsTerms(data.metal) }} - {{ formatEuro( convertOunceToGram( data.rate )) }} / g
						</h5>
						<button type="button"
						class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
						data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body relative p-4 flex justify-center">

						<div class="mb-3 xl:w-96">

							<input
                type="number"
                class="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                  text-center
                "
                placeholder="Poids (en g)"

                v-model="weight"
                @input="calculate()"

                @blur="clear()"
							/>

							<br>

							<h3 class="text-3xl font-bold mb-8 text-center" v-if="!isNaN(value) && value">
								{{ formatEuro( value ) }}
							</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
import myMixins from '../mixins';

export default {
  name: 'ModalCalculator',

   data() {
        return {
			weight: Number,
            value: Number
        };
    },

	// Props are read only!
	props: {
		data: {
			metal: String,
			rate: Number
		}
	},

	methods: {
		calculate( )
		{
			this.value = ( this.weight * this.convertOunceToGram(this.data.rate) ).toFixed(2);
		},

		clear() {
			this.value = false;
			this.weight = '';
		}
	},

	mounted() {
		console.log("mounted child");
	},

	mixins: [myMixins]
}
</script>