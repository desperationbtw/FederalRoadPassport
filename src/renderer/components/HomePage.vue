<template>
<div id="content-container" >
			<div id="_bg__web_1920___1"  ></div>
			<img src="~@/assets/bg_map.png" id="bg_map" />

			<div id="m_russia"  >
				<img src="~@/assets/m_russia_ek1.png" id="m_russia_ek1" />

			</div>

			<div id="mgtu"  >
				<img src="~@/assets/mgtu_ek1.png" id="mgtu_ek1" />

			</div>

			<div id="component_4___1"  >
				<div id="__________________________________________________________" >
					<span class="char">Электронный паспорт федеральных трасс<br>Российской Федерации</span>
				</div>

			</div>

			<div id="component_3___2"  >
				<div id="rltstudio____2020____________________" >
					RLTStudio (с) 2020. Все права защищены
				</div>

			</div>

			<div id="component_6___3"  >

				<div id="component_3___1"  >
					<div id="rectangle_1"  ></div>

				</div>

				<div id="component_5___1"  >

					<div id="component_6___1" @click="route('/map')">

						<div id="group_5"  >
							<div id="rectangle_3"  ></div>
							<div id="_______" >
								<span class="char">Создать</span>
							</div>
							<img src="~@/assets/add_icon.png" id="add_icon" />

						</div>

					</div>

					<div id="component_6___2" class="disabled-element" >

						<div id="group_5_ek1"  >
							<div id="rectangle_3_ek1"  ></div>
							<div id="________ek1" >
								<span class="char">Открыть</span>
							</div>
							<img src="~@/assets/open_icon.png" id="open_icon" />

						</div>

					</div>

				</div>

			</div>

		</div>
</template>

<script>
export default {
  name: "useless",
  methods: {
    route(path) {
      this.$router.push(path);
    },
    test() {
      const electron = require("electron").remote;
      const dialog = electron.dialog;

      dialog.showOpenDialog(fileNames => {
        //more code that doesn't matter...
      });
    }
  }
};
</script>

<style>
body { margin: 0px; padding: 0px; font-family:"Arial"; overflow-x:hidden; }

img { position: absolute; display: block; margin: 0px; border: none; padding: 0px; }

div { position: absolute; }

#content-container { display: table; position: relative; width: 1000px; height: 563px; margin-left: auto; margin-right: auto;  }

#_bg__web_1920___1 {
	top: 0px;
	left: 0px;
	width: 1000px;
	height: 563px;
	background:rgba(255,255,255,255);
}


#bg_map {
	top: 69px;
	left: 92px;
	width: 816px;
	height: 426px;
}

#m_russia {
	top: 0px;
	left: 0px;
	width: 162px;
	height: 162px;
}

#m_russia_ek1 {
	top: 10px;
	left: 10px;
	width: 142px;
	height: 142px;
}

#mgtu {
	top: 0px;
	left: 838px;
	width: 162px;
	height: 162px;
}

#mgtu_ek1 {
	top: 10px;
	left: 10px;
	width: 142px;
	height: 142px;
}

#component_4___1 {
	top: 0px;
	left: 262px;
	width: 476px;
	height: 80px;
}

#__________________________________________________________ {
	top: 10px;
	left: 6px;
	width: 461px;
	height: 64px;
	font-family: Segoe UI;
	font-size: 22px;
	font-weight: bold;
	text-align: center;
	color:#000000;
}

#component_3___2 {
	top: 527px;
	left: 0px;
	width: 300px;
	height: 36px;
}

#rltstudio____2020____________________ {
	opacity:0.56000000238419;
	top: 10px;
	left: 8px;
	width: 285px;
	height: 19px;
	font-family: Arial;
	font-size: 14px;
	font-weight: bold;
	text-align: center;
	color:#000000;
}

#component_6___3 {
	top: 227px;
	left: 404px;
	width: 193px;
	height: 110px;
}
#component_3___1 {
	top: 0px;
	left: 0px;
	width: 193px;
	height: 110px;
}

#rectangle_1 {
	opacity:0.80000001192093;
	top: 0px;
	left: 0px;
	width: 191px;
	height: 108px;
	-ms-border-radius: 20px;
	-o-border-radius: 20px;
	-moz-border-radius: 20px;
	-webkit-border-radius: 20px;
	border-radius: 20px;
	border: 1px solid #3b5a72;
	background:rgba(59,90,114,255);
}

#component_5___1 {
	top: 13px;
	left: 16px;
	width: 161px;
	height: 87px;
}
#component_6___1 {
	cursor: pointer;
	top: 0px;
	left: 0px;
	width: 161px;
	height: 40px;
}

.disabled-element {
  pointer-events: none;
  opacity: 0.4;
}

#group_5 {
	top: 0px;
	left: 0px;
	width: 161px;
	height: 40px;
}

#rectangle_3 {
	top: 0px;
	left: 0px;
	width: 159px;
	height: 38px;
	-ms-border-radius: 20px;
	-o-border-radius: 20px;
	-moz-border-radius: 20px;
	-webkit-border-radius: 20px;
	border-radius: 20px;
	border: 1px solid #707070;
	background:rgba(255,255,255,255);
}


#_______ {
	top: 9px;
	left: 39px;
	width: 83px;
	height: 25px;
	font-family: Segoe UI;
	font-size: 17px;
	font-weight: bold;
	text-align: center;
	color:#000000;
}


#add_icon {
	top: 9px;
	left: 8px;
	width: 22px;
	height: 22px;
}

#component_6___2 {
	top: 47px;
	left: 0px;
	width: 161px;
	height: 40px;
}
#group_5_ek1 {
	top: 0px;
	left: 0px;
	width: 161px;
	height: 40px;
}

#rectangle_3_ek1 {
	top: 0px;
	left: 0px;
	width: 159px;
	height: 38px;
	-ms-border-radius: 20px;
	-o-border-radius: 20px;
	-moz-border-radius: 20px;
	-webkit-border-radius: 20px;
	border-radius: 20px;
	border: 1px solid #707070;
	background:rgba(255,255,255,255);
}


#________ek1 {
	top: 9px;
	left: 38px;
	width: 85px;
	height: 25px;
	font-family: Segoe UI;
	font-size: 17px;
	font-weight: bold;
	text-align: center;
	color:#000000;
}


#open_icon {
	top: 13px;
	left: 11px;
	width: 15px;
	height: 15px;
}
</style>