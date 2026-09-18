/** Ilha usada para comprovar hidratação e interação na combinação instalada. */
import React, {useState} from 'react';
export default function Counter(){const [value,setValue]=useState(0);return <button onClick={()=>setValue(value+1)}>Contagem: {value}</button>;}
