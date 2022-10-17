var app = {
	isLoading: true,
	version: "01082018v1",
	originalAmount: 0,
	moneyToPay: undefined,
	getMoney: function() {		
		var a = this.getResult("1");
		var b = this.getResult("2");
		var c = this.getResult("5");
		var d = this.getResult("10");
		var e = this.getResult("20");
		var f = this.getResult("50");
		var g = this.getResult("100");
		var h = this.getResult("200");
		var i = this.getResult("500");
		var j = this.getResult("1000");
		var k = this.getResult("2000");
		var l = this.getResult("5000");
		var m = this.getResult("10000");
	
		var money = [[1, a], [2, b], [5, c], [10, d], [20, e], [50, f], [100, g], [200, h], [500, i], [1000, j], [2000, k], [5000, l], [10000, m]];

		return money;
	},
	init: function() {		
		app.initStorage();
		app.calculateTotal();
	},
	initStorage: function() {
		var money = this.getMoney();
		//init coins and bills
		for(i = 0; i <= 12; i++) {
			if(money[i][1] == null) {
				app.storeResult(money[i][0], 0);
			}
		}
	},
	resetStorage: function() {
		var money = this.getMoney();
		for(i = 0; i <= 12; i++) {
			app.storeResult(money[i][0], 0);
		}
	},
	calculateTotal: function() {
		var money = this.getMoney();		
		var total = (parseInt(money[0][1]) * 1) + (parseInt(money[1][1]) * 2) + (parseInt(money[2][1]) * 5) + (parseInt(money[3][1]) * 10) + (parseInt(money[4][1]) * 20) + (parseInt(money[5][1]) * 50) + (parseInt(money[6][1]) * 100) + (parseInt(money[7][1]) * 200) + (parseInt(money[8][1]) * 500) + (parseInt(money[9][1]) * 1000) + (parseInt(money[10][1]) * 2000) + (parseInt(money[11][1]) * 5000) + (parseInt(money[12][1]) * 10000);		
		document.getElementById("total").innerHTML = (total / 100).toFixed(2) + " euro";
		for(i = 0; i <= 12; i++) {
			var id = "valuta-" + money[i][0];
			document.getElementById(id).innerHTML = money[i][1] + " x";
		}
	},
	add: function(id) {
		if(typeof(Storage) !== "undefined") {
			var currVal = parseInt(localStorage.getItem(id));
			localStorage.setItem(id, currVal + 1);
			this.calculateTotal();
		}
	},
	remove: function(id) {
		if(typeof(Storage) !== "undefined") {
			var currVal = parseInt(localStorage.getItem(id));
			var newVal = currVal - 1;
			if(newVal < 0) {
				newVal = 0;
			}
			localStorage.setItem(id, newVal);
			this.calculateTotal();
		}
	},
	calculatePayment: function(amount) {
		if(amount == undefined) {
			//convert to cents for easy calculation
			amount = document.getElementById("payment-amount").value.replace(",", ".");
			amount = (eval(amount).toFixed(2)).replace(".","");
			app.originalAmount = amount;
		}
		var output = document.getElementById("output");
		var money = this.getMoney();
		var total = (parseInt(money[0][1]) * 1) + (parseInt(money[1][1]) * 2) + (parseInt(money[2][1]) * 5) + (parseInt(money[3][1]) * 10) + (parseInt(money[4][1]) * 20) + (parseInt(money[5][1]) * 50) + (parseInt(money[6][1]) * 100) + (parseInt(money[7][1]) * 200) + (parseInt(money[8][1]) * 500) + (parseInt(money[9][1]) * 1000) + (parseInt(money[10][1]) * 2000) + (parseInt(money[11][1]) * 5000) + (parseInt(money[12][1]) * 10000);
		if(amount <= total) {
			var message = "";
			var visualMessage = "Betaal met: <br>";
			var changeMoney = "";

			//check if amount exactly available
			if(amount > 0){
				for(i = 0; i < money.length - 1; i++) {
					for(j = money[i][1] - 1; j >= 0; j--) {
						message = message + app.convertToEuro(money[i][0]) + ",";
						visualMessage = visualMessage + '<img src="images/money/' + money[i][0] + '.png">';
						amount = amount - money[i][0];
						money[i][1]--;
						if(amount <= 0) {
							break;
						}
					}
				}
			} else {
				message = "saldo ontoereikend";
			}

			if(amount != 0){
				money = this.getMoney();
				amount = app.originalAmount;
				message = "";
				visualMessage = "";

				for(i = (money.length - 1); i >=0; i--) {
					if(money[i][0] <= amount) {						
						if(money[i][1] > 0) {						
							for(j = money[i][1] - 1; j >= 0; j--) {
								message = message + app.convertToEuro(money[i][0]) + ",";
								visualMessage = visualMessage + '<img src="images/money/' + money[i][0] + '.png">';
								amount = amount - money[i][0];
								money[i][1]--;
								if(amount <= 0 ) {
									changeMoney = amount;
									break;
								}
							}
						}
					}
				}
			} else {
				message = "saldo ontoereikend";
			}
			
			//als er nog een bedrag over is dan moeten we een hoger item zoeken	en dus voorgaande resetten
			if(amount > 0) {
				money = this.getMoney();
				amount = app.originalAmount;
				message = "";
				visualMessage = "Betaal met: <br>";
				var changeMoney = app.originalAmount;				
				//changemoney nog uitwerken
				for(i = 0; i <= (money.length - 1); i++) {
					if(money[i][0] >= amount && money[i][1] > 0) {
						message = message + app.convertToEuro(money[i][0]) + ",";
						visualMessage = visualMessage + '<img src="images/money/' + money[i][0] + '.png">';					
						money[i][1]--;
						amount = amount - money[i][0];
						changeMoney = amount;
						if(money <= 0) {
							break;
						}
					}
				}
			}
			app.moneyToPay = money;
			output.innerHTML = '<br>' + visualMessage + '<br><br>Terugkrijgen: ' + (Math.abs(changeMoney) / 100) + "&euro;";
		} else {
			output.innerHTML = '<span class="error">Onvoldoende budget</span>';
		}
	},
	confirmPayment() {
		if(app.moneyToPay != undefined) {
			for(i = (app.moneyToPay.length - 1); i >=0; i--) {
				localStorage.setItem(app.moneyToPay[i][0], app.moneyToPay[i][1]);
			}
			app.moneyToPay = undefined;
		}
		window.location = "index.html";
	},
	storeResult(name, val) {
		if(typeof(Storage) !== "undefined") {
			localStorage.setItem(name, val);
		}
	},
	getResult(id) {
		if(typeof(Storage) !== "undefined") {
			return localStorage.getItem(id);
		}
	},
	convertToEuro($cents) {
		return $cents / 100 + " euro";
	}
};

var calculator = {
	action: "",
	calculation: "",
	pos: 0,
	setCalculatorValue: function(val, action) {
		var fv = document.getElementById("result");
		if(action == "=") {
			var regex1 = new RegExp(':', 'g');
			var regex2 = new RegExp('x', 'g');
			calculator.checkPostfixes();
			fv.value = calculator.calculation + "=" + (eval(calculator.calculation.replace(regex1, "/").replace(regex2, "*")).toFixed(2));
			calculator.calculation = "";
		} else if((action == '+') || (action == '-') || (action == 'x') || (action == ':')) {				
			calculator.checkPostfixes();
			calculator.calculation = calculator.calculation + val;
			fv.value = calculator.calculation;
		} else if(action == "clear") {
			calculator.reset();
		} else {
			calculator.calculation = calculator.calculation + val;
			fv.value = calculator.calculation;
		}
		calculator.pos = calculator.pos + 1;
	},
	reset: function() {
		var fv = document.getElementById("result");
		fv.value = calculator.calculation;
		calculator.calculation = "";
		calculator.pos = 0;
	},
	checkPostfixes: function() {
		if(calculator.calculation.charAt(calculator.pos - 1) == ".") {
			calculator.calculation = calculator.calculation + "00";
			calculator.pos = calculator.pos + 2;
		} else if(calculator.calculation.charAt(calculator.pos - 2) == ".") {
			calculator.calculation = calculator.calculation + "0";
			calculator.pos = calculator.pos + 1;
		} else if(calculator.calculation.charAt(calculator.pos - 3) != ".") {
			calculator.calculation = calculator.calculation + ".00";
			calculator.pos = calculator.pos + 3;
		}
	}
};