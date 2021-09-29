const images = require('images');
const path = require('path');

module.exports.getrandom = (max) => {
  //provides random number from zero to max value
  if (max == 1) {
    return 0;
  } else {
    return parseInt(Math.random() * (max - 0) + 0);
  }
};

module.exports.compose_image = async (traits, Id) => {

  try {
    //function to compose image
    const backgroundpath = path.join(__dirname, './images/', `${traits[0]}.png`);
    // const backgroundpath = path.join(__dirname, './images/', "Bloody.png");
    console.log("background write successfully : ", traits[0]);
    const skin = path.join(__dirname, './images/', `${traits[1]}.png`);
    images(backgroundpath).draw(images(skin), 10, 1).save(`${Id}.png`);
    console.log("Skin putted successfully : ", traits[1]);
    for (i = 2; i < traits.length; i++) {
      if (traits[i] == 'shirtless') {
        continue;
      }
      images(`${Id}.png`)
        .draw(
          images(path.join(__dirname, './images/', `${traits[i]}.png`)),
          10,
          10
        )
        .save(`${Id}.png`);
      console.log(traits[i], " added successfully");
    }
    console.log('Image created...', Id);

  } catch (error) {

  }

};
