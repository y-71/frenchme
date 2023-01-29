import React, { useState, useEffect } from "react";
import { SectionsContainer, Section, ScrollToTopOnMount } from "react-fullpage";
import Questions from "./Questions";
import swal from "sweetalert";
import "./static/style";

// => in the render() method of your app
const data = [
  {
    title: "Résidez vous en France de manière stable? *",
    id: "residence_status",
    link: "regular_situation",
    error: "Il vous faut un titre de sejour Stable",
    i: 1,
  },
  {
    title: "Êtes-vous en situation régulière (titre de séjour en règle)? *",
    id: "regular_situation",
    link: "",
    error: "Il vous faut une situation régulière",
    i: 2,
  },
];

const anchorFunc = (anchor_data) => {
  // return array of anchor tags
  return anchor_data.map((item) => item.id);
};

export default function FullPage() {
  let options = {
    sectionClassName: "section",
    anchors: anchorFunc(data),
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    sectionPaddingTop: "50px",
    sectionPaddingBottom: "50px",
    arrowNavigation: false,
  };

  const [obj, setObj] = useState({});

  const inputDataHandler = (name, value) => {
    console.log(name, value);
    console.log(obj);
    setObj({
      ...obj,
      [name]: value,
    });
  };

  const submitBtnHandler = () => {
    console.log(obj);
    //API call here
    swal({
      //show success message on completion
      title: "",
      text: "Vous avez le droit a une Sécurité sociale!!",
      icon: "success",
      dangerMode: false,
    });
  };

  return (
    <div>
      <ScrollToTopOnMount />
      <SectionsContainer {...options}>
        {data.map((item, i) => {
          return (
            <Section key={i}>
              <div>
                <header className="App-header">
                  <Questions
                    item={item}
                    index={i}
                    isSubmit={i == data.length - 1 ? true : false}
                    inputDataHandler={inputDataHandler}
                    submitBtnHandler={submitBtnHandler}
                  />
                </header>
              </div>
            </Section>
          );
        })}
      </SectionsContainer>
    </div>
  );
}
