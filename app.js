const traits = require('./traits');
const limits = require('./limits');
const exceptions = require('./exceptions');
const { getrandom, compose_image } = require('./utils');
let imagecount = 0;
let TrueCount = 0;
let Gender, Background, Skin, Outfit, Eyes, Mouths, Hairs;
for (counter = 1; imagecount <= 50; counter++) {
  Background = traits.background[getrandom(traits.background.length)];

  if (getrandom(2) == 0 && limits.data.Male.counter <= limits.data.Male.limit) {
    Gender = 'Male';
    Skin = traits.Male_Skin[getrandom(traits.Male_Skin.length)];
    Outfit = traits.Male_Outfit[getrandom(traits.Male_Outfit.length)];
    Eyes = traits.Male_Eyes[getrandom(traits.Male_Eyes.length)];
    Mouths = traits.Male_Mouths[getrandom(traits.Male_Mouths.length)];
    Hairs = traits.Male_Hairs[getrandom(traits.Male_Hairs.length)];
  } else if (limits.data.Female.counter <= limits.data.Female.limit) {
    Gender = 'Female';
    Skin = traits.Female_Skin[getrandom(traits.Female_Skin.length)];
    Outfit = traits.Female_Oufit[getrandom(traits.Female_Oufit.length)];
    Eyes = traits.Female_Eyes[getrandom(traits.Female_Eyes.length)];
    Mouths = traits.Female_Mouths[getrandom(traits.Female_Mouths.length)];
    Hairs = traits.Female_Hairs[getrandom(traits.Female_Hairs.length)];
  }

  // let attributes = [Background, Skin, Outfit, Eyes, Mouths, Hairs];
  // if (Gender == 'Male') {
  //   maleExceptions = Object.keys(exceptions.Male);
  //   for (i = 0; i < maleExceptions.length; i++) {
  //     if (attributes.includes(maleExceptions[i])) {
  //       e = exceptions.Male[maleExceptions[i]];
  //       FilteredArray = attributes.filter((data) => {
  //         return !e.includes(data);
  //       });
  //       attributes = FilteredArray;
  //     }
  //   }
  // } else {
  //   if (Gender == 'Female') {
  //     FemaleExceptions = Object.keys(exceptions.Female);
  //     for (i = 0; i < FemaleExceptions.length; i++) {
  //       if (attributes.includes(FemaleExceptions[i])) {
  //         e = exceptions.Female[FemaleExceptions[i]];
  //         FilteredArray = attributes.filter((data) => {
  //           return !e.includes(data);
  //         });
  //         attributes = FilteredArray;
  //       }
  //     }
  //   }
  // }
  // attributes.forEach((data) => {
  //   if (limits.data[data].counter <= limits.data[data].counter) {
  //     TrueCount += 1;
  //   }
  // });
  // console.log('TrueCount: ' + TrueCount + 'attributes: ' + attributes.length);
  // if (TrueCount == attributes.length) {
  //   attributes.forEach((data) => {
  //     console.log('Traits going to update counter limits : ', data);
  //     limits.data[data].counter += 1;
  //   });

  //   console.log('attributes : ', attributes);
  //   compose_image(attributes, counter);
  //   imagecount += 1;
  //   TrueCount = 0;
  // } else {
  //   continue;
  // }

  let attributes = [Background, Skin, Outfit, Eyes, Mouths, Hairs];
  attriRemovalCheck = attributes.length;
  if (Gender == 'Male') {
    maleExceptions = Object.keys(exceptions.Male);
    for (i = 0; i < maleExceptions.length; i++) {
      if (attributes.includes(maleExceptions[i])) {
        e = exceptions.Male[maleExceptions[i]];
        FilteredArray = attributes.filter((data) => {
          return !e.includes(data);
        });
        attributes = FilteredArray;
      }
    }
  } else {
    if (Gender == 'Female') {
      FemaleExceptions = Object.keys(exceptions.Female);
      for (i = 0; i < FemaleExceptions.length; i++) {
        if (attributes.includes(FemaleExceptions[i])) {
          e = exceptions.Female[FemaleExceptions[i]];
          FilteredArray = attributes.filter((data) => {
            return !e.includes(data);
          });
          attributes = FilteredArray;
        }
      }
    }
  }
  if (attriRemovalCheck != attributes.length) {
    counter -= 1;
    continue;
  }
  attributes.forEach((data) => {
    if (limits.data[data].counter <= limits.data[data].counter) {
      TrueCount += 1;
    }
  });
  //console.log('TrueCount: ' + TrueCount + 'attributes: ' + attributes.length);
  if (TrueCount == attributes.length) {
    attributes.forEach((data) => {
      //console.log('Traits going to update counter limits : ', data);
      limits.data[data].counter += 1;
    });

    console.log('attributes : ', attributes);
    compose_image(attributes, counter);
    imagecount += 1;
    TrueCount = 0;
  } else {
    continue;
  }
}
