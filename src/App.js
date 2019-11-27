import React, { useState, useEffect } from "react";
import "./App.css";
import * as Sentry from "@sentry/browser";
// import styled from "styled-components";
import { ClickArea, Text } from "./StyledComponents";

const App = () => {

	
};
Sentry.init({
	dsn: "https://01cad872659c4c56bc7aa5054cd26ff5@sentry.io/1835069",
});

export default App;
