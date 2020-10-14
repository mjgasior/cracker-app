import React from "react";

export const Image = ({ filename, description }) => filename && <img src={`/images/${filename}`} alt={description}/>