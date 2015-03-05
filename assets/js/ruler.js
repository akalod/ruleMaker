var rule = function(params){
	this.template = null;
	this.settings = {
		selector: '.ruler',
		templateSelector: '.ruler-template',
		data : null,
		values: null,
	}
	this.getTemplate = function(){
		var findTemplate =$(this.settings.selector).find(this.settings.templateSelector);
		this.template = findTemplate.html(); //şablonu al-aktar
		findTemplate.remove();//sayfadan sil
	}

	this.makeRule = function(){

		var ruleTemplate = this.template;
		var val = this.settings.values;
		//array ın döndürülmesi
		for (i in val)
		{
		       //template i düzenleme işlemi
		      ruleTemplate = ruleTemplate.replace(eval('/{ '+i+' }/g'), val[i]);
		     
		}
		$(this.settings.selector).append(ruleTemplate);
		 
	}

	this.getTemplateData = function(){
		var datas = $(this.settings.selector).data('rule');
		eval('datas = ' + datas); //string i json aktarımı

 		data = new Array();
		$.map(datas, function(el,as) { data[as]=el }); //jsondan array a aktarımı

		this.settings.values=data; //value ve key lerin aktarımı
 

	}

	this.setTrigger = function(){
		var that = this;
		$(document).on('mouseenter', '.ruler-rule', function () {
		   //üzerine gelinceki şey
		});
		$(document).on('mouseleave', '.ruler-rule', function () {		     
			//üzerinden gidinceki şey
		});
		$(document).on('click', that.settings.selector+' .rule-add' , function () {		     
			//çoğalt 
			that.makeRule();
			
		});
		$(document).on('click', '.rule-remove', function () {		     
			//yoket
			$(this).parent().remove();
		});

		 

	}
 
 

	this.run = function(){
		if(!jQuery) {
			console.log('jQuery kütüphanesi yüklenemedi..');
			return false;
		}
		this.setTrigger();
		this.getTemplate();
		this.getTemplateData(); 
		if(!this.settings.data){
			this.makeRule(); 
		}
	}
}



if(typeof(jQuery) !== 'undefined') {


	$(function(){

		new rule().run();

	})


}else {
	console.log('jQuery kütüphanesi bulunamadı..');
}
