function SliderFlex(select, speedSlide, speedTransition, sliderNav) {
	
	/* Комментарий разработчику: */
	/** Так объявлять параметры функции SliderFlex(select, speedSlide = 1000, speedTransition = 200, sliderNav) нельзя **/
	/** Такой код не работает в iOS **/
	/** Задавать значение параметров по умолчанию включили только в EsmaScript 6 **/
	
	/** А вот так можно давать значения по умолчанию не обязательным параметрам. **/
	if (speedSlide == undefined) speedSlide = 1000;
	if (speedTransition == undefined) speedTransition = 200;
	
	/**Обычно необязательные параметры в конец списка **/
	/** SliderFlex(select, sliderNav, speedSlide, speedTransition) **/
	
}