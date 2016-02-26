var sagas = [];


var newSaga = function (){


  var deed;

  for (i=0; i <10; i++) {

    sagas.push(function(){
      deed = i;
      console.log(deed);

    });

  }

  for (i=0; i <sagas.length; i++) {

    sagas[i]();

  }
};

 newSaga();
