import React, { useState, useEffect } from "react";
import { Input, Icon, Button, Radio } from "antd";
import { isMobile } from "react-device-detect";

export default function Questions({
  item,
  index,
  isSubmit,
  inputDataHandler,
  submitBtnHandler,
}) {
  const [value, setValue] = useState({});
  const [canPass, setCanPass] = useState();
  useEffect(() => {
    // Update the document title using the browser API
    document.getElementById("0").focus();
    console.log("render");
  }, []);

  const clickHandler = (link, i) => {
    if (!canPass) return;
    console.log(i);
    location.href = `#${link}`;
    const nextEl = document.getElementById(i.toString());
    if (!nextEl) submitHandler();
    else
      setTimeout(() => {
        nextEl.focus();
      }, 1100);
  };

  const inputHandler = (e) => {
    console.log("e:", e.target.name, e.target.value);
    console.log(value);
    setCanPass(e.target.value);
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    inputDataHandler(e.target.name, e.target.value);
  };

  const submitHandler = () => {
    submitBtnHandler();
  };

  return (
    <div>
      <div className="title">
        <h2>
          <span className="count">
            {index + 1} &nbsp;
            <Icon type="arrow-right" />
          </span>
          &nbsp;
          <span className="title">{item.title}</span>
        </h2>
      </div>
      {/* {canPass ? <>way</> : <>way</>} */}
      <div
        name={item.id}
        id={index}
        onKeyDown={(e) => {
          if (e.keyCode === 13) clickHandler(item.link, item.i);
        }}
      >
        <Radio.Group
          name={item.id}
          id={index}
          className="typeform-input"
          onChange={inputHandler}
          defaultValue="a"
          size="large"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Radio.Button value={true}>Oui</Radio.Button>
          <Radio.Button value={false}>Non</Radio.Button>
        </Radio.Group>
      </div>
      <br />
      {isSubmit ? (
        <Button id="submit-btn" onClick={submitHandler}>
          One click away! 🙃
        </Button>
      ) : (
        <div>
          <Button
            hidden={isMobile}
            icon="check"
            id="enter-btn"
            onClick={() => clickHandler(item.link, item.i)}
          >
            OK
          </Button>
          <span className="press-enter">
            {" "}
            presser <span className="bold">ENTERER</span>
          </span>
        </div>
      )}
    </div>
  );
}
