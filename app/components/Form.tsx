"use client";
import { unstable_useCacheRefresh, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { jsPDF } from "jspdf";
import SignatureForm from "./SignatureForm";
import autoTable from 'jspdf-autotable';
import AbstractModalHeader from 'react-bootstrap/esm/AbstractModalHeader';
import Link from 'next/link';
import Image from 'next/image';
import { write } from 'fs';


const content = {
  en: {
    langButton: "Español",

    // Header & Main Titles
    pleaseFillForm: "Please fill up the form",
    medicalAndDentalHistory: "MEDICAL AND DENTAL HISTORY",

    mainTitle: "PATIENT INFORMATION FORM",

    // Patient Info Section
    personalInfo: "PERSONAL INFORMATION",
    firstName: "First Name",
    name: "Name",
    lastName: "Last Name",
    dob: "Date of Birth",
    nss: "SSN",
    address: "Address",
    street: "Street Number",
    unit: "Unit/Suite",
    city: "City",
    state: "State",
    zipCode: "Zip Code",
    phones: "Phone Numbers",
    homePhone: "Home Phone",
    cellPhone: "Cell Phone",
    workPhone: "Work Phone",
    email: "Email",
    sexAtBirth: "Sex assigned at birth?",
    male: "Male",
    female: "Female",
    describeGender: "How do you describe your gender?",
    man: "Man",
    woman: "Woman",
    transgender: "Transgender",
    emergencyContact: "Emergency Contact Information",
    contactName: "Contact Name",
    relationship: "Relationship",
    spouse: "Spouse",
    child: "Child",
    parent: "Parent",
    sibling: "Sibling",
    friend: "Friend",
    other: "Other",
    emergencyPhone: "Emergency Phone Number",

    // Medical History Section
    medicalHistory: "MEDICAL HISTORY",
    physicianName: "Name of Physician",
    lastPhysical: "Last Physical Exam Date",
    physicianPhone: "Physician Phone Number",
    physicianAddress: "Physician Address",
    underCare: "Are you under care of anything?",
    medication: "Are you taking any medication?",
    allergies: "Do you have any allergies?",
    latex: "Are you allergic to Latex?",
    haveOrhad: "Do you have, or have you had any of the following:",
    //list of illnesses
    bloodPressure: "Abnormal Blood Pressure",
    epilepsy: "Epilepsy",
    osteoporosis: "Osteoporosis",
    alcoholAddiction: "Alcohol Addiction",
    faintingSpells: "Fainting Spells",
    prolongedBleeding: "Prolonged Bleeding",
    anemia: "Anemia",
    feverBlisters: "Fever Blisters",
    prostheticImplants: "Prosthetic Implants",
    anorexia: "Anorexia",
    glaucoma: "Glaucoma",
    psychiatricCare: "Psychiatric Care",
    arthritisRheumatism: "Arthritis/Rheumatism",
    hearingImpaired: "Hearing Impaired",
    radiationTherapy: "Radiation Therapy",
    artificialHeartValve: "Artificial Heart Valve",
    heartDiseaseSurgery: "Heart Disease or Surgery",
    recreationalDrugUse: "Recreational Drug Use",
    artificialJoint: "Artificial Joint",
    heartMurmur: "Heart Murmur",
    removalofSpleen: "Removal of Spleen",
    asthma: "Asthma",
    heartPacemaker: "Heart Pacemaker",
    rheumaticFever: "Rheumatic Fever",
    bulimia: "Bulimia",
    hemophilia: "Hemophilia",
    rheumaticHeartDisease: "Rheumatic Heart Disease",
    cancer: "Cancer",
    hepatitis: "Hepatitis",
    sickleCellDisease: "Sickle Cell Disease",
    chemicalDependency: "Chemical Dependency",
    hivAids: "HIV/AIDS",
    sinusTrouble: "Sinus Trouble",
    chemotherapy: "Chemotherapy",
    kidneyProblems: "Kidney Problems",
    stroke: "Stroke",
    chestPain: "Chest Pain",
    learningDisability: "Learning Disability",
    thyroidDisease: "Thyroid Disease",
    congenitalHeartDisease: "Congenital Heart Disease",
    liverDisease: "Liver Disease",
    tuberculosis: "Tuberculosis",
    cortisoneMedicine: "Cortisone Medicine",
    lungDisease: "Lung Disease",
    tumors: "Tumors",
    diabetes: "Diabetes",
    mitralValveProlapse: "Mitral Valve Prolapse",
    ulcers: "Ulcers",
    emphysema: "Emphysema",
    neurologicalDisorders: "Neurological Disorders",
    venerealDisease: "Venereal Disease",
    organTransplant: "Organ Transplant",
    noMedicalHistory: "No significant medical history reported",
    hospitalizationAccident: "Have you had any other serious illness, hospitalization or accident?",
    ifYesExplain: "If yes, explain",
    otherIllness: "Have you had any other serious illness, hospitalization or accident?",
    smokeTabacco: "Smooke/Tabacco",
    alcoholText: "Alcohol",
    tabacco: "Do you currently smoke or use any tobacco products?",
    option: "Select an option",
    iDontSmooke: "I do not smoke",
    cigarrettes: "I smoke Cigarrettes",
    vape: "I vape", pipe: "I smoke a pipe",
    alcohol: "Do you currently drink alcoholic beverages?",
    dontDrinkAlcohl: "I do not drink alcohol",
    drinkOccasionally: "I drink occasionally",
    drinkRegularly: "I drink regularly",
    //only Women
    onlyWomen: "ONLY FOR WOMEN",
    pregnant: "Are you pregnant?",
    pregnant2: "Pregnant",
    nursing: "Are you nursing?",
    nurging2: "Nursing",
    birthControl: "Birth Control",
    nOfPregnancies: "Number of pregnancies",
    pregnancies: "Pregnancies",
    nOfLivingChildren: "Number of living children",
    children: "Children",
    birthControlMedication: "Are you taking birth control medication?",
    becomingPregnant: "Are you planning to become pregnant?",

    // Dental History Section
    dentalHistory: "DENTAL HISTORY",
    lastDentalVisit: "Date of last dental visit",
    dentalProblem: "Is there a problem that brought you today?",
    dentalProblem2: "Dental Problem",
    gumsBleed: "1. Do your gums bleed when you brush or floss?",
    gumsBleed2: "1.Gums Bleed?",
    tempSensitivity: "2. Do you experience tooth sensitivity to hot or cold?",
    hotColdSensitivity: "2. Hot/Cold Sensitivity?",
    tasteSensitivity: "3. Do you experience tooth sensitivity to sweet or sour?",
    sweetSourSensitivity: "3. Sweet/Sour Sensitivity?",
    toothPain: "4. Do you feel pain in any of your teeth?",
    toothPain2: "4. Tooth Pain?",
    mouthSore: "5. Do you feel any sore or lump in or near your mouth?",
    soresLumps: "5. Sores/Lumps in mouth?",
    jawInjury: "6. Have you ever had any head, neck or jaw injury?",
    neckJawInjuries: "6. Neck/Jaw injuries?",
    headaches: "7. Do you have frequent headaches?",
    frequentHeadaches: "7. Frequent headaches?",
    grindTeeth: "8. Do you clench or grind your teeth?",
    clenchGrindTeeth: "8. Clench/Grind teeth?",
    biteCheek: "9. Do you bite your lips or cheeks frequently?",
    biteCheeksLips: "9. Bite cheeks/lips?",
    jawClick: "10. Have you ever experienced clicking of your jaw?",
    clickingJaw: "10. Clicking jaw?",
    facePain: "11. Have you ever experienced pain (joint, ear, side of face)?",
    faceEarjointPain: "11. Face/Ear joint pain?",
    mouthOpen: "12. Have you ever experienced difficulty opening or closing?",
    difficultyOpeningMouth: "12. Difficulty opening mouth?",
    chewing: "13. Have you ever experienced difficulty in chewing?",
    difficultyChewing: "13. Difficulty chewing?",
    ortho: "14. Have you had any orthodontic treatment (braces)?",
    braces: "14. Braces?",
    extractionBleed: "15. Have you had prolonged bleeding after an extraction?",
    prolongBleeding2: "15. Prolonged bleeding?",
    brushingInstr: "16. Have you had instructions on the correct method of brushing?",
    brushingInstructions: "16. Brushing instructions?",
    gumInstr: "17. Have you had instructions on the care of your gums?",
    careOfGums: "17. Care of gums?",
    comments: "Comments",
    writeComments: "Write here any comments",
    yes: "Yes",
    no: "No",
    none: "None",

    // Legal & Buttons
    iHaveRead: "By signing this document, I acknowledge that I have read ",
    noticePrivacy: "the Notice of Privacy Practices. ",
    copy: "I understand that a copy of this policy is available to me upon request.",

    authStaff: "By signing this document, I authorize the clinical staff to perform x-rays, study models, photographs, or any other diagnostic procedures deemed necessary to reach a thorough diagnosis and develop a treatment plan for my dental needs.",

    bySigningThisDoc: "By signing this document, ",
    cancelPolicy: "I understand that I must cancel an appointment at least 24 hours previous, otherwise, I will have to pay a cancelation fee of $50.00.",

    respCost: "By signing this document, I agree to be responsible for the full cost of all dental services provided. If I have insurance, I authorize this office to submit claims on my behalf,",
    totalObligation: "but I acknowledge that any remaining balance not paid by the insurance is my total obligation.",

    certifyInfo: "By signing this document, I certify that I have read and understand this form and the information given is accurate.",
    notHold: "I will not hold my dentist, or any other member of the staff, responsible for any action they take or do not take because or errors or omissions that I have made in the completion of this form.",
    signature: "Signature:",

    clearSig: "Clear Signature",
    send: "Send Signed PDF",
    clearForm: "Clear Form",
    toggleBtn: "Español"
  },
  es: {
    langButton: "English",
    medicalAndDentalHistory: "HISTORIAL MÉDICO Y DENTAL",
    // Header & Main Titles
    pleaseFillForm: "Por favor complete el formulario",
    // Patient Info Section
    personalInfo: "INFORMACIÓN PERSONAL",
    firstName: "Nombre",
    name: "Nombre",
    lastName: "Apellido",
    dob: "Fecha de Nacimiento",
    nss: "Número de Seguro Social",
    address: "Dirección",
    street: "Nombre de la Calle",
    unit: "Unidad/Suite",
    city: "Ciudad",
    state: "Estado",
    zipCode: "Código Postal",
    phones: "Números de Teléfono",
    homePhone: "Teléfono de Casa",
    cellPhone: "Teléfono Celular",
    workPhone: "Teléfono de Trabajo",
    email: "Correo Electrónico",
    sexAtBirth: "¿Sexo asignado al nacer?",
    male: "Masculino",
    female: "Femenino",
    describeGender: "¿Cómo describe su género?",
    man: "Hombre",
    woman: "Mujer",
    transgender: "Transgénero",
    emergencyContact: "Información de Contacto de Emergencia",
    contactName: "Nombre del Contacto",
    relationship: "Parentesco",
    spouse: "Esposo(a)",
    child: "Hijo(a)",
    parent: "Padre/Madre",
    sibling: "Hermano(a)",
    friend: "Amigo(a)",
    other: "Otro",
    emergencyPhone: "Teléfono de Emergencia",

    // Medical History Section
    medicalHistory: "HISTORIAL MÉDICO",
    physicianName: "Nombre del Médico",
    lastPhysical: "Fecha del último examen físico",
    physicianPhone: "Teléfono del Médico",
    physicianAddress: "Dirección del Médico",
    underCare: "¿Está bajo algún tratamiento médico?",
    medication: "¿Está tomando algún medicamento?",
    allergies: "¿Tiene alguna alergia?",
    latex: "¿Es alérgico al Látex?",
    haveOrhad: "¿Tiene o ha tenido alguno de los siguientes?:",
    //list of illnesses
    bloodPressure: "Presión Arterial Anormal",
    epilepsy: "Epilepsia",
    osteoporosis: "Osteoporosis",
    alcoholAddiction: "Adicción al Alcohol",
    faintingSpells: "Desmayos",
    prolongedBleeding: "Sangrado Prolongado",
    anemia: "Anemia",
    feverBlisters: "Herpes Labial",
    prostheticImplants: "Implantes Protésicos",
    anorexia: "Anorexia",
    glaucoma: "Glaucoma",
    psychiatricCare: "Cuidado Psiquiátrico",
    arthritisRheumatism: "Artritis/Rheumatismo",
    hearingImpaired: "Dificultad Auditiva",
    radiationTherapy: "Terapia de Radiación",
    artificialHeartValve: "Válvula Cardíaca Artificial",
    heartDiseaseSurgery: "Enfermedad Cardíaca o Cirugía",
    recreationalDrugUse: "Uso Recreativo de Drogas",
    artificialJoint: "Articulación Artificial",
    heartMurmur: "Soplo en el Corazón",
    removalofSpleen: "Remoción del Bazo",
    asthma: "Asthma",
    heartPacemaker: "Marcapasos",
    rheumaticFever: "Fiebre Reumática",
    bulimia: "Bulimia",
    hemophilia: "Hemophilia",
    rheumaticHeartDisease: "Enfermedad Cardíaca Reumática",
    cancer: "Cáncer",
    hepatitis: "Hepatitis",
    sickleCellDisease: "Anemia Falciforme",
    chemicalDependency: "Dependencia Química",
    hivAids: "HIV/SIDA",
    sinusTrouble: "Sinusitis",
    chemotherapy: "Quimioterapia",
    kidneyProblems: "Problemas Renales",
    stroke: "Derrame Cerebral",
    chestPain: "Dolor en el Pecho",
    learningDisability: "Problemas de Aprendizaje",
    thyroidDisease: "Problemas de Tiroides",
    congenitalHeartDisease: "Enfermedades del Corazon Congénitas",
    liverDisease: "Enfermedad del Hígado",
    tuberculosis: "Tuberculosis",
    cortisoneMedicine: "Cortisona",
    lungDisease: "Problemas Pulmonares",
    tumors: "Tumores",
    diabetes: "Diabetes",
    mitralValveProlapse: "Prolapso de la Válvula Mitral",
    ulcers: "Úlceras",
    emphysema: "Enfisema Pulmonar",
    neurologicalDisorders: "Trastornos Neurológicos",
    venerealDisease: "Enfermedad Venérea",
    organTransplant: "Transplante de Órganos",
    noMedicalHistory: "Ningun historial médico reportado",
    hospitalizationAccident: "¿Ha tenido alguna enfermedad seria, o ha sido hospitalizado(a) o ha tenido algun accidente?",
    ifYesExplain: "Si es así, explique",
    smokeTabacco: "Fumar/Tabacco",
    alcoholText: "Alcohol",
    tabacco: "¿Actualmente fuma o usa productos de tabaco?",
    option: "Seleccione una opción",
    iDontSmooke: "No fumo",
    cigarrettes: "Fumo cigarrillos",
    vape: "Fumo vape",
    pipe: "Fumo puro o pipa",
    alcohol: "¿Consume bebidas alcohólicas?",
    dontDrinkAlcohl: "No consumo bebidas alcohólicas",
    drinkOccasionally: "Consumo bebidas alcohólicas ocasionalmente",
    drinkRegularly: "Consumo bebidas alcohólicas regularmente",
    //only Women
    onlyWomen: "SOLO PARA MUJERES",
    pregnant: "¿Está embarazada?",
    pregnant2: "Embarazada",
    nursing: "¿Está amamantando?",
    nurging2: "Amamantando",
    birthControl: "Anticonceptivos",
    nOfPregnancies: "Número de embarazos",
    pregnancies: "Embarazos",
    nOfLivingChildren: "Número de hijos vivos",
    children: "Hijos",
    birthControlMedication: "¿Está tomando anticonceptivos?",
    becomingPregnant: "¿Está planeando quedar embarazada?",
    // Dental History Section
    dentalHistory: "HISTORIAL DENTAL",
    lastDentalVisit: "Fecha de la última visita dental",
    dentalProblem: "¿Hay algún problema que lo trajo hoy?",
    dentalProblem2: "Problema Dental",
    gumsBleed: "1. ¿Le sangran las encías al cepillarse o usar hilo dental?",
    gumsBleed2: "1.¿Sangrado de Encías?",
    tempSensitivity: "2. ¿Siente sensibilidad al frío o al calor?",
    hotColdSensitivity: "2. ¿Sensibilidad caliente/frio?",
    tasteSensitivity: "3. ¿Siente sensibilidad a lo dulce o salado?",
    sweetSourSensitivity: "3.¿Sensibilidad dulce/salado?",
    toothPain: "4. ¿Siente dolor en alguno de sus dientes?",
    toothPain2: "4. ¿Dolor de Dientes?",
    mouthSore: "5. ¿Siente alguna llaga o bulto en o cerca de la boca?",
    soresLumps: "5. ¿Dolor/Bultos en la Boca?",
    jawInjury: "6. ¿Ha tenido alguna lesión en la cabeza, cuello o mandíbula?",
    neckJawInjuries: "6. ¿Lesiones en Cuello/Mandibula?",
    headaches: "7. ¿Tiene dolores de cabeza frecuentes?",
    frequentHeadaches: "7. ¿Dolores de Cabeza Frecuentes?",
    grindTeeth: "8. ¿Aprieta o rechina los dientes?",
    clrendchGrindTeeth: "8. ¿Aprieta/Rechina los Dientes?",
    clenchGrindTeeth: "8. ¿Aprieta/Rechina los Dientes?",
    biteCheek: "9. ¿Se muerde los labios o las mejillas con frecuencia?",
    biteCheeksLips: "9.¿Se Muerde labios/mejillas?",
    jawClick: "10. ¿Ha sentido que le truena la mandíbula?",
    clickingJaw: "10. ¿Truena la mandíbula?",
    facePain: "11. ¿Ha sentido dolor (articulación, oído, lado de la cara)?",
    faceEarjointPain: "11. ¿Dolor en Articulación Oído/Cara?",
    mouthOpen: "12. ¿Ha tenido dificultad para abrir o cerrar la boca?",
    difficultyOpeningMouth: "12. ¿Dificultad para abrir la boca?",
    chewing: "13. ¿Ha tenido dificultad para masticar?",
    difficultyChewing: "13. ¿Dificultad para masticar?",
    ortho: "14. ¿Ha tenido tratamiento de ortodoncia (brackets)?",
    braces: "14. ¿Brackets?",
    extractionBleed: "15. ¿Ha tenido sangrado prolongado tras una extracción?",
    prolongBleeding2: "15. ¿Sangrado Prolongado?",
    brushingInstr: "16. ¿Ha recibido instrucciones sobre el cepillado correcto?",
    brushingInstructions: "16. ¿Instrucciones de cepillado?",
    gumInstr: "17. ¿Ha recibido instrucciones sobre el cuidado de encías?",
    careOfGums: "17. ¿Cuidado de encías?",
    comments: "Comentarios",
    writeComments: "Escriba sus comentarios aquí",
    yes: "Sí",
    no: "No",
    sometimes: "A veces",
    none: "Ninguno",

    // Legal & Buttons
    iHaveRead: "Al firmar este documento, reconozco que he leído ",
    noticePrivacy: "el Aviso de Prácticas de Privacidad. ",
    copy: "Y entiendo que podria adquirir una copia si la solicito.",

    authStaff: "Al firmar este documento, autorizo al personal clínico a realizar radiografías, modelos de estudio, fotografías o cualquier otro procedimiento diagnóstico que se considere necesario para establecer mi tratamiento dental.",
    bySigningThisDoc: "Al firmar este documento, ",
    cancelPolicy: "entiendo que debo cancelar las citas al menos con 24 horas de anticipación, de lo contrario, tendré que pagar una multa de $50.00.",
    respCost: "Al firmar, me hago responsable del pago total de los servicios dentales. En caso de tener aseguranza, autorizo a esta oficina a tramitar mis reclamos de seguro; sin embargo,",
    totalObligation: " reconozco que soy totalmente responsable de cualquier saldo que el seguro no cubra.",
    certifyInfo: "Al firmar este documento, certifico que he leído y entiendo este formulario y que la información proporcionada es exacta. ",
    notHold: "No responsabilizaré a mi dentista, ni a ningún otro miembro del personal, por cualquier acción que tomen o no tomen debido a errores u omisiones que haya cometido al completar este formulario.",
    signature: "Firma:",
    clearSig: "Borrar Firma",
    send: "Enviar PDF Firmado",
    clearForm: "Limpiar Formulario",
    toggleBtn: "English"
  }
};




export default function MyForm() {

  const [language, setLanguage] = useState('en'); //Default language is English
  const t = content[language]; //Content object based on selected language

  //Creating the constants for form data and signature image
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dateOfBirth: '', nss: '', address: '', address2: '',
    city: '', state: '', zipCode: '', cellPhone: '', homePhone: '', workPhone: '', email: '',
    sexAtBirth: '', gender: '', emergencyContactName: '', emergencyContactRelationship: '', emergencyContactPhone: '',
    nameOfPhysician: '', physicianPhone: '', physicianAddress: '', dateLastExam: ''
  });

  const [medicalHistory, setMedicalHistory] = useState({
    underCareofAnything: '', takingMedication: '', haveAllergies: '', allergicToLatex: false, bloodPressure: false,
    epilepsy: false, osteoporosis: false, alcoholAddiction: false, faintingSpells: false, prolongedBleeding: false,
    anemia: false, feverBlisters: false, prostheticImplants: false, anorexia: false, glaucoma: false, psychiatricCare: false,
    arthritisRheumatism: false, hearingImpaired: false, radiationTherapy: false, artificialHeartValve: false, heartDiseaseSurgery: false,
    recreationalDrugUse: false, artificialJoint: false, heartMurmur: false, removalofSpleen: false, asthma: false,
    heartPacemaker: false, rheumaticFever: false, bulimia: false, hemophilia: false, rheumaticHeartDisease: false, cancer: false,
    hepatitis: false, sickleCellDisease: false, chemicalDependency: false, hivAids: false, sinusTrouble: false, chemotherapy: false,
    kidneyProblems: false, stroke: false, chestPain: false, learningDisability: false, thyroidDisease: false, congenitalHeartDisease: false,
    liverDisease: false, tuberculosis: false, cortisoneMedicine: false, lungDisease: false, tumors: false, diabetes: false,
    mitralValveProlapse: false, ulcers: false, emphysema: false, neurologicalDisorders: false, venerealDisease: false, organTransplant: false, hospitalizationAccident: "",
    smokeTabaccoProducts: "", drinkAlcohol: "", pregnant: false, nursing: false, nOfPregnancies: "", nOfLivingChildren: "", birthControlMedication: false, becomingPregnant: false
  });

  const [dentalHistory, setDentalHistory] = useState({
    dateLastDentalVisit: '', problemBroughtYouIn: '', gumsBleed: '', teethSensitiveToHotCold: '', teethSensitiveToSweets: '', painTeeth: '', haveSoreOrLumpsInMouth: '', neckJawInjuries: '', headaches: '', grindTeeth: '', biteCheeksLips: '',
    expereiencedClickingJaw: '', faceEarjointPain: '', difficultyOpeningMouth: '', difficultyChewing: '', orthodontic: '', dentalProlongedBleeding: '', instructioinsOfBrushing: '', careOfGums: '', dentalComments: ''
  });


  const handleToggle = (condition) => {
    setMedicalHistory((prev) => ({
      ...prev,
      [condition]: !prev[condition],
    }));

    setDentalHistory((prev) => ({
      ...prev,
      [condition]: !prev[condition],
    }));

  };


  // Function to handle clearing the form
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {

    // const { name, value } = e.currentTarget;

    // // Update FormData
    // if (name in formData) {
    //   setFormData(prev => ({ ...prev, [name]: value }));
    // }
    // // Update Medical History
    // if (name in medicalHistory) {
    //   setMedicalHistory(prev => ({ ...prev, [name]: value }));
    // }
    // // Update Dental History
    // if (name in dentalHistory) {
    //   setDentalHistory(prev => ({ ...prev, [name]: value }));
    // }

    // Reset text fields
    setFormData({
      firstName: '', lastName: '', dateOfBirth: '', nss: '', address: '', address2: '',
      city: '', state: '', zipCode: '', cellPhone: '', homePhone: '', workPhone: '', email: '',
      sexAtBirth: '', gender: '', emergencyContactName: '', emergencyContactRelationship: '', emergencyContactPhone: '',
      nameOfPhysician: '', physicianPhone: '', physicianAddress: '', dateLastExam: ''
    });

    // // Reset medical history checkboxes
    setMedicalHistory({
      underCareofAnything: '', takingMedication: '', haveAllergies: '', allergicToLatex: false, bloodPressure: false,
      epilepsy: false, osteoporosis: false, alcoholAddiction: false, faintingSpells: false, prolongedBleeding: false,
      anemia: false, feverBlisters: false, prostheticImplants: false, anorexia: false, glaucoma: false, psychiatricCare: false,
      arthritisRheumatism: false, hearingImpaired: false, radiationTherapy: false, artificialHeartValve: false, heartDiseaseSurgery: false,
      recreationalDrugUse: false, artificialJoint: false, heartMurmur: false, removalofSpleen: false, asthma: false,
      heartPacemaker: false, rheumaticFever: false, bulimia: false, hemophilia: false, rheumaticHeartDisease: false, cancer: false,
      hepatitis: false, sickleCellDisease: false, chemicalDependency: false, hivAids: false, sinusTrouble: false, chemotherapy: false,
      kidneyProblems: false, stroke: false, chestPain: false, learningDisability: false, thyroidDisease: false, congenitalHeartDisease: false,
      liverDisease: false, tuberculosis: false, cortisoneMedicine: false, lungDisease: false, tumors: false, diabetes: false,
      mitralValveProlapse: false, ulcers: false, emphysema: false, neurologicalDisorders: false, venerealDisease: false, organTransplant: false,
      hospitalizationAccident: "", smokeTabaccoProducts: "", drinkAlcohol: "", pregnant: false, nursing: false, nOfPregnancies: "", nOfLivingChildren: "", birthControlMedication: false, becomingPregnant: false
    });

    setDentalHistory({
      dateLastDentalVisit: '', problemBroughtYouIn: "", gumsBleed: "", teethSensitiveToHotCold: "", teethSensitiveToSweets: "", painTeeth: "", haveSoreOrLumpsInMouth: "", neckJawInjuries: "", headaches: "", grindTeeth: "", biteCheeksLips: "",
      expereiencedClickingJaw: "", faceEarjointPain: "", difficultyOpeningMouth: "", difficultyChewing: "", orthodontic: "", dentalProlongedBleeding: "", instructioinsOfBrushing: "", careOfGums: "", dentalComments: ""
    });
  };


  const [signatureImage, setSignatureImage] = useState(null);

  // This function is now correctly defined to fix the error on line 100
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setMedicalHistory(prev => ({
      ...prev,
      [name]: value
    }));
    setDentalHistory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePDF = async(logoData:string) => {
    const doc = new jsPDF();
    const today = new Date();
    const dateString = today.toLocaleDateString();
    const margin = 20;
    const pageWidth = 170;

    // 4. Add to PDF (X: 10, Y: 1, Width: 50, Height: 100)
     // doc.addImage(logoData, 'PNG', 18, 5, 63, 27);

    try {
      // 1. Load the image from your public folder
      const response = await fetch('/logo.png');
      const blob = await response.blob();

      // 2. Convert Blob to a Uint8Array (jsPDF handles this very well)
      const arrayBuffer = await blob.arrayBuffer();
      const logoData = new Uint8Array(arrayBuffer);

      // 3. Add to PDF (using 'PNG' or 'JPEG' depending on your file)
      // 4. Add to PDF (X: 10, Y: 1, Width: 50, Height: 100)
      doc.addImage(logoData, 'PNG', 18, 5, 63, 27);


    } catch (error) {
      console.error("Logo failed to load, continuing without it", error);
    }


    // --- Helpers ---
    const formatDate = (dateStr) => {
      if (!dateStr) return "N/A";
      const [year, month, day] = dateStr.split('-');
      return `${month}/${day}/${year}`;
    };

    const formatPhoneNumber = (phone) => {
      if (!phone) return "N/A";
      const cleaned = ('' + phone).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      return match ? `(${match[1]})-${match[2]}-${match[3]}` : phone;
    };

    const writeInline = (doc, x, y, segments) => {
      let currentX = x;
      segments.forEach(seg => {
        doc.setFontSize(10);
        doc.setFont("helvetica", seg.style || "normal");
        doc.text(seg.text, currentX, y);
        currentX += doc.getTextWidth(seg.text);
      });
    };

    const writeTitle = (doc, x, y, segments) => {
      let currentX = x;
      segments.forEach(seg => {
        doc.setFontSize(12);
        doc.setFont("helvetica", seg.style || "normal");
        doc.text(seg.text, currentX, y);
        currentX += doc.getTextWidth(seg.text);
      });
    };

    let y = 27;
    // --- 1. PERSONAL INFORMATION ---
    writeTitle(doc, 80, y + 4, [{ text: t.personalInfo, style: "bold" }]);
    writeInline(doc, 20, y + 12, [
      { text: t.name + ': ', style: "bold" }, { text: `${formData.firstName} ${formData.lastName} ` },
      { text: t.dob + ': ', style: "bold" }, { text: formatDate(formData.dateOfBirth) + ' ' },
      { text: t.nss + ': ', style: "bold" }, { text: `${formData.nss}` }
    ]);
    writeInline(doc, 20, y + 18, [
      { text: t.address + ': ', style: "bold" },
      { text: `${formData.address}, ${formData.address2 || ''}, ${formData.city}, ${formData.state}, ${formData.zipCode}` }
    ]);
    writeInline(doc, 20, y + 24, [
      { text: t.phones + ': ', style: "bold" },
      { text: `H: ${formatPhoneNumber(formData.homePhone)} | C: ${formatPhoneNumber(formData.cellPhone)} | W: ${formatPhoneNumber(formData.workPhone)}` }
    ]);
    writeInline(doc, 20, y + 30, [{ text: t.email + ': ', style: "bold" }, { text: `${formData.email}` }]);
    writeInline(doc, 20, y + 36, [
      { text: t.sexAtBirth + ': ', style: "bold" }, { text: `${formData.sexAtBirth}  ` },
      { text: t.describeGender + ': ', style: "bold" }, { text: `${formData.gender}` }
    ]);

    // --- 2. MEDICAL HISTORY ---
    writeTitle(doc, 80, y + 44, [{ text: t.medicalHistory, style: "bold" }]);
    writeInline(doc, 20, y + 48, [
      { text: t.physicianName + ": ", style: "bold" }, { text: `${formData.nameOfPhysician}  ` },
      { text: t.physicianPhone + ": ", style: "bold" }, { text: formatPhoneNumber(formData.physicianPhone) }
    ]);
    writeInline(doc, 20, y + 54, [{ text: t.underCare + ": ", style: "bold" }, { text: medicalHistory.underCareofAnything || "N/A" }]);
    writeInline(doc, 20, y + 60, [{ text: t.medication + ": ", style: "bold" }, { text: medicalHistory.takingMedication || "None" }]);
    writeInline(doc, 20, y + 66, [
      { text: t.allergies + ": ", style: "bold" }, { text: `${medicalHistory.haveAllergies}  ` },
      { text: t.latex + ": ", style: "bold" }, { text: medicalHistory.allergicToLatex ? t.yes : t.no }
    ]);


    writeInline(doc, 70, y + 73, [{ text: t.haveOrhad, style: "bold" }]);
    // Medical Conditions Table
    const medicalHistorySchema = [
      { label: t.bloodPressure, key: "bloodPressure" },
      { label: t.epilepsy, key: "epilepsy" },
      { label: t.osteoporosis, key: "osteoporosis" },
      { label: t.alcoholAddiction, key: "alcoholAddiction" },
      { label: t.faintingSpells, key: "faintingSpells" },
      { label: t.prolongedBleeding, key: "prolongedBleeding" },
      { label: t.anemia, key: "anemia" },
      { label: t.feverBlisters, key: "feverBlisters" },
      { label: t.prostheticImplants, key: "prostheticImplants" },
      { label: t.anorexia, key: "anorexia" },
      { label: t.glaucoma, key: "glaucoma" },
      { label: t.psychiatricCare, key: "psychiatricCare" },
      { label: t.arthritisRheumatism, key: "arthritisRheumatism" },
      { label: t.hearingImpaired, key: "hearingImpaired" },
      { label: t.radiationTherapy, key: "radiationTherapy" },
      { label: t.artificialHeartValve, key: "artificialHeartValve" },
      { label: t.heartDiseaseSurgery, key: "heartDiseaseSurgery" },
      { label: t.recreationalDrugUse, key: "recreationalDrugUse" },
      { label: t.artificialJoint, key: "artificialJoint" },
      { label: t.heartMurmur, key: "heartMurmur" },
      { label: t.removalofSpleen, key: "removalofSpleen" },
      { label: t.asthma, key: "asthma" },
      { label: t.heartPacemaker, key: "heartPacemaker" },
      { label: t.rheumaticFever, key: "rheumaticFever" },
      { label: t.bulimia, key: "bulimia" },
      { label: t.hemophilia, key: "hemophilia" },
      { label: t.rheumaticHeartDisease, key: "rheumaticHeartDisease" },
      { label: t.cancer, key: "cancer" },
      { label: t.hepatitis, key: "hepatitis" },
      { label: t.sickleCellDisease, key: "sickleCellDisease" },
      { label: t.chemicalDependency, key: "chemicalDependency" },
      { label: t.hivAids, key: "hivAids" },
      { label: t.sinusTrouble, key: "sinusTrouble" },
      { label: t.chemotherapy, key: "chemotherapy" },
      { label: t.kidneyProblems, key: "kidneyProblems" },
      { label: t.stroke, key: "stroke" },
      { label: t.chestPain, key: "chestPain" },
      { label: t.learningDisability, key: "learningDisability" },
      { label: t.thyroidDisease, key: "thyroidDisease" },
      { label: t.congenitalHeartDisease, key: "congenitalHeartDisease" },
      { label: t.liverDisease, key: "liverDisease" },
      { label: t.tuberculosis, key: "tuberculosis" },
      { label: t.cortisoneMedicine, key: "cortisoneMedicine" },
      { label: t.lungDisease, key: "lungDisease" },
      { label: t.tumors, key: "tumors" },
      { label: t.diabetes, key: "diabetes" },
      { label: t.mitralValveProlapse, key: "mitralValveProlapse" },
      { label: t.ulcers, key: "ulcers" },
      { label: t.emphysema, key: "emphysema" },
      { label: t.neurologicalDisorders, key: "neurologicalDisorders" },
      { label: t.venerealDisease, key: "venerealDisease" },
      { label: t.organTransplant, key: "organTransplant" }
    ];

    const activeConditions = medicalHistorySchema.filter(item => medicalHistory[item.key] === true);
    const tableData = [];
    for (let i = 0; i < activeConditions.length; i += 3) {
      const row = activeConditions.slice(i, i + 3).map(item => `[X] ${item.label}`);
      while (row.length < 3) row.push("");
      tableData.push(row);
    }

    autoTable(doc, {
      startY: y + 78,
      body: tableData.length > 0 ? tableData : [[t.noMedicalHistory]],
      theme: 'plain',
      styles: { fontSize: 9 },
      margin: { left: 20 }
    });

    let finalY = doc.lastAutoTable.finalY + 6;

    // Hospitalization/Accidents
    writeInline(doc, 20, finalY, [{ text: t.hospitalizationAccident, style: "bold" }]);
    autoTable(doc, {
      startY: finalY + 1,
      body: [[medicalHistory.hospitalizationAccident || "None reported."]],
      theme: 'plain',
      styles: { fontSize: 9 },
      margin: { left: 20 }
    });

    finalY = doc.lastAutoTable.finalY + 3;

    // Lifestyle Summary
    writeInline(doc, 20, finalY, [
      { text: t.smokeTabacco + ": ", style: "bold" }, { text: `${medicalHistory.smokeTabaccoProducts || 'No'} | ` },
      { text: t.alcoholText + ": ", style: "bold" }, { text: `${medicalHistory.drinkAlcohol || 'No'}` }
    ]);

    finalY += 10;

    // --- 3. WOMEN'S SECTION (CONDITIONAL) ---
    if (formData.sexAtBirth === t.female) {
      writeTitle(doc, 80, finalY, [{ text: t.onlyWomen, style: "bold" }]);
      finalY += 6;
      writeInline(doc, 20, finalY, [
        { text: t.pregnant2 + ": ", style: "bold" }, { text: `${medicalHistory.pregnant ? t.yes : t.no} | ` },
        { text: t.nurging2 + ": ", style: "bold" }, { text: `${medicalHistory.nursing ? t.yes : t.no} | ` },
        { text: t.birthControl + ": ", style: "bold" }, { text: `${medicalHistory.birthControlMedication ? "Yes" : "No"} | ` },
        { text: t.pregnancies + ": ", style: "bold" }, { text: `${medicalHistory.nOfPregnancies} | ` },
        { text: t.children + ": ", style: "bold" }, { text: `${medicalHistory.nOfLivingChildren}` }
      ]);
      finalY += 10;
    }

    // --- 4. DENTAL HISTORY ---
    // Page check
    if (finalY > 270) { doc.addPage(); finalY = 20; }

    writeTitle(doc, 80, finalY, [{ text: t.dentalHistory, style: "bold" }]);
    finalY += 8;
    // Printing dental history as a list instead of a table for better formatting. We will add a table for comments at the end.
    const dentalQuestions = [
      { label: t.lastDentalVisit, val: formatDate(dentalHistory.dateLastDentalVisit) },
      { label: t.dentalProblem2, val: dentalHistory.problemBroughtYouIn },
      { label: t.gumsBleed2, val: dentalHistory.gumsBleed },
      { label: t.hotColdSensitivity, val: dentalHistory.teethSensitiveToHotCold },
      { label: t.sweetSourSensitivity, val: dentalHistory.teethSensitiveToSweets },
      { label: t.toothPain2, val: dentalHistory.painTeeth },
      { label: t.soresLumps, val: dentalHistory.haveSoreOrLumpsInMouth },
      { label: t.neckJawInjuries, val: dentalHistory.neckJawInjuries },
      { label: t.frequentHeadaches, val: dentalHistory.headaches },
      { label: t.clenchGrindTeeth, val: dentalHistory.grindTeeth },
      { label: t.biteCheeksLips, val: dentalHistory.biteCheeksLips },
      { label: t.clickingJaw, val: dentalHistory.expereiencedClickingJaw },
      { label: t.faceEarjointPain, val: dentalHistory.faceEarjointPain },
      { label: t.difficultyOpeningMouth, val: dentalHistory.difficultyOpeningMouth },
      { label: t.difficultyChewing, val: dentalHistory.difficultyChewing },
      { label: t.braces, val: dentalHistory.orthodontic },
      { label: t.prolongBleeding2, val: dentalHistory.dentalProlongedBleeding },
      { label: t.brushingInstructions, val: dentalHistory.instructioinsOfBrushing },
      { label: t.careOfGums, val: dentalHistory.careOfGums },
    ];

    // dentalQuestions.forEach(q => {
    //   if (finalY > 270) { doc.addPage(); finalY = 20; }
    //   writeInline(doc, 20, finalY, [{ text: `${q.label}: `, style: "bold" }, { text: `${q.val}` }]);
    //   finalY += 6;
    // });

    //Printing dental history as table for better formatting. We will add a table for comments at the end.
    const columnWidth = 95; // Adjust based on your page width
    const leftMargin = 20;

    // Loop by 2s
    for (let i = 0; i < dentalQuestions.length; i += 2) {
      // Check for page overflow
      if (finalY > 275) {
        doc.addPage();
         try {
      // 1. Load the image from your public folder
      const response = await fetch('/logo.png');
      const blob = await response.blob();

      // 2. Convert Blob to a Uint8Array (jsPDF handles this very well)
      const arrayBuffer = await blob.arrayBuffer();
      const logoData = new Uint8Array(arrayBuffer);

      // 3. Add to PDF (using 'PNG' or 'JPEG' depending on your file)
      // 4. Add to PDF (X: 10, Y: 1, Width: 50, Height: 100)
      doc.addImage(logoData, 'PNG', 18, 5, 63, 27);

    } catch (error) {
      console.error("Logo failed to load, continuing without it", error);
    }
        finalY = 40;
      }

      // Get the two questions for this row
      const q1 = dentalQuestions[i];
      const q2 = dentalQuestions[i + 1];

      // Print Column 1
      writeInline(doc, leftMargin, finalY, [
        { text: `${q1.label}: `, style: "bold" },
        { text: `${q1.val || ""}` }
      ]);

      // Print Column 2 (only if it exists)
      if (q2) {
        writeInline(doc, leftMargin + columnWidth, finalY, [
          { text: `${q2.label}: `, style: "bold" },
          { text: `${q2.val || ""}` }
        ]);
      }
      // Move to the next line
      finalY += 6;
    }

    // Comments Table
    if (finalY > 270)
    { doc.addPage();
     try {
      // 1. Load the image from your public folder
      const response = await fetch('/logo.png');
      const blob = await response.blob();

      // 2. Convert Blob to a Uint8Array (jsPDF handles this very well)
      const arrayBuffer = await blob.arrayBuffer();
      const logoData = new Uint8Array(arrayBuffer);

      // 3. Add to PDF (using 'PNG' or 'JPEG' depending on your file)
      // 4. Add to PDF (X: 10, Y: 1, Width: 50, Height: 100)
      doc.addImage(logoData, 'PNG', 18, 5, 63, 27);

    } catch (error) {
      console.error("Logo failed to load, continuing without it", error);
    }
      finalY = 20; }
    finalY += 6;
    writeInline(doc, 20, finalY, [{ text: t.comments + ":", style: "bold" }]);

    autoTable(doc, {
      startY: finalY + 3,
      body: [[dentalHistory.dentalComments || t.none]],
      theme: 'plain',
      styles: { fontSize: 10, fontStyle: 'italic' },
      margin: { left: 20, right: 20 },
    });
    finalY = doc.lastAutoTable.finalY + 12;

    //--- 5. DISCLOSURES & LEGAL ---
    //Calculate space needed. We check if we are too low on the page.
    if (finalY > 200) {
      doc.addPage();
      try {
      // 1. Load the image from your public folder
      const response = await fetch('/logo.png');
      const blob = await response.blob();

      // 2. Convert Blob to a Uint8Array (jsPDF handles this very well)
      const arrayBuffer = await blob.arrayBuffer();
      const logoData = new Uint8Array(arrayBuffer);

      // 3. Add to PDF (using 'PNG' or 'JPEG' depending on your file)
      // 4. Add to PDF (X: 10, Y: 1, Width: 50, Height: 100)
      doc.addImage(logoData, 'PNG', 18, 5, 63, 27);

    } catch (error) {
      console.error("Logo failed to load, continuing without it", error);
    }

      // 4. Add to PDF (X: 10, Y: 1, Width: 50, Height: 100)
      //doc.addImage(logoData, 'PNG', 18, 5, 63, 27);
      finalY = 40;
    }
   

    const disclosures = [
      t.iHaveRead + t.noticePrivacy + t.copy,
      t.authStaff,
      t.bySigningThisDoc + t.cancelPolicy,
      t.respCost + t.totalObligation,
      t.certifyInfo + t.notHold
    ];

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    disclosures.forEach((text) => {
      // splitTextToSize wraps the text so it doesn't go off the page
      const lines = doc.splitTextToSize(text, pageWidth);
      // Secondary check: if an individual paragraph will bleed off
      if (finalY + (lines.length * 5) > 285) {
        doc.addPage();
        finalY = 25;
      }

      doc.text(lines, margin, finalY);
      // Move Y down: (number of lines * line height) + paragraph spacing
    finalY += (lines.length * 5) + 4;
  });

  // --- 5. SIGNATURE ---
  if (finalY > 240) { doc.addPage(); finalY = 20; }

  doc.setFont("helvetica", "bold");
  doc.text(`Date Signed: ${dateString}`, 20, finalY + 5);

  if (signatureImage) {
    // Draw a line for the signature
    doc.addImage(signatureImage, 'PNG', 20, finalY + 15, 50, 20);
    doc.line(20, finalY + 35, 100, finalY + 35);
    doc.setFontSize(8);
    doc.text("Patient or Guardian Signature", 20, finalY + 40);
    doc.text(`Patient: ${formData.firstName} ${formData.lastName}`, 20, finalY + 46);
  }
const totalPages = doc.internal.getNumberOfPages();

for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    // 180 is the X-position (right side), 20 is the Y-position (aligned with logo)
    doc.text(`Page ${i} / ${totalPages}`, 180, 20, { align: 'right' });
}

//doc.save("medical-form.pdf");

  window.open(URL.createObjectURL(doc.output("blob")));
  
};

const handleLanguageToggle = () => {
  setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
}

return (
  <Container>
    <Form onSubmit={(e) => { e.preventDefault(); generatePDF(); }}>
      <div className="card-header mb-3">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" href="#">
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={150}
                height={50}
                priority // Ensures the logo loads immediately
              />
            </Link>
          </div>
        </nav>
        <br />
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" onClick={handleLanguageToggle} className="btn btn-outline-primary btn-lg">
            {t.langButton}
          </button>
        </div>
        <br />
        <div className='row mb-3'>
          <div className="col">
            <h4 className="text-center">{t.pleaseFillForm}</h4>
          </div>
        </div>
        <div className='row mb-3'>
          <div className="col">
            <h4 className="text-center">{t.medicalAndDentalHistory}</h4>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              name="firstName"
              className="form-control"
              placeholder={t.firstName}
              value={formData.firstName}
              onChange={handleChange}
              suppressHydrationWarning // Add this here
            />
          </div>
          <div className="col">
            <input
              name="lastName"
              className="form-control"
              placeholder={t.lastName}
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label className="fs-6">{t.dob}</label>
            <input
              name="dateOfBirth"
              type="date"
              className="form-control"
              placeholder="Date of Birth"
              value={formData.dateOfBirth || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label></label>
            <input
              name="nss"
              className="form-control"
              placeholder={t.nss}
              value={formData.nss}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              name="address"
              className="form-control"
              placeholder={t.street}
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              name="address2"
              className="form-control"
              placeholder={t.unit}
              value={formData.address2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              name="city"
              className="form-control"
              placeholder={t.city}
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              name="state"
              className="form-control"
              placeholder={t.state}
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              name="zipCode"
              className="form-control"
              placeholder={t.zipCode}
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              name="homePhone"
              className="form-control"
              placeholder={t.homePhone}
              value={formData.homePhone}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              name="cellPhone"
              className="form-control"
              placeholder={t.cellPhone}
              value={formData.cellPhone}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              name="workPhone"
              className="form-control"
              placeholder={t.workPhone}
              value={formData.workPhone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              name="email"
              className="form-control"
              placeholder={t.email}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='row mb-3'>
          <div className="col">
            <h6 className="card-header">{t.sexAtBirth}:</h6>
            <div className="form-check">
              {/*Make Option*/}
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sexAtBirth"
                  id="sexMale"
                  value={t.male}
                  checked={formData.sexAtBirth === t.male}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">{t.male}</label>
              </div>
              {/*Female Option*/}
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name='sexAtBirth'
                  id="sexFemale"
                  value={t.female}
                  checked={formData.sexAtBirth === t.female}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox2">{t.female}</label>
              </div>
            </div>
          </div>
        </div>
        <div className='row mb-3'>
          <div className="col">
            <h6 className="card-header">{t.describeGender}:</h6>
            <div className="form-check">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name='gender'
                  id="genderMan"
                  value={t.man}
                  checked={formData.gender === t.man}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">{t.man}</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name='gender'
                  id="genderWoman"
                  value={t.woman}
                  checked={formData.gender === t.woman}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox2">{t.woman}</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name='gender'
                  id="Transgeneder"
                  value={t.transgender}
                  checked={formData.gender === t.transgender}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="inlineCheckbox2">{t.transgender}</label>
              </div>
            </div>
          </div>
        </div>
        <h6 className="card-header">{t.emergencyContact}:</h6>
        <div className="row mb-3">
          <div className="col">
            <input
              name="emergencyContactName"
              className="form-control"
              placeholder={t.contactName}
              value={formData.emergencyContactName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              name="emergencyContactRelationship"
              className="form-control"
              placeholder={t.relationship}
              list='EmergencyContactRelationshipanswers'
              value={formData.emergencyContactRelationship}
              onChange={handleChange}
            />
            <datalist id="EmergencyContactRelationshipanswers">
              <option value={t.spouse} />
              <option value={t.child} />
              <option value={t.parent} />
              <option value={t.sibling} />
              <option value={t.friend} />
              <option value={t.other} />
            </datalist>
          </div>
          <div className="col">
            <input
              name="emergencyContactPhone"
              className="form-control"
              placeholder={t.emergencyPhone}
              value={formData.emergencyContactPhone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <h4 className="card-header text-center">{t.medicalHistory}</h4>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              name="nameOfPhysician"
              className="form-control"
              placeholder={t.physicianName}
              value={formData.nameOfPhysician}
              onChange={handleChange}
            />
          </div>
        </div>
        <h6 className="card-header">{t.lastPhysical}:</h6>
        <div className="row mb-3">
          <div className="col">
            <input
              name="dateLastExam"
              type='date'
              className="form-control"
              // placeholder="Last Physical Exam Date" 
              value={formData.dateLastExam}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              name="physicianPhone"
              className="form-control"
              placeholder={t.physicianPhone}
              value={formData.physicianPhone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              name="physicianAddress"
              className="form-control"
              placeholder={t.physicianAddress}
              value={formData.physicianAddress}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              name="underCareofAnything"
              className="form-control"
              placeholder={t.underCare}
              value={medicalHistory.underCareofAnything}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              name="takingMedication"
              className="form-control"
              placeholder={t.medication}
              value={medicalHistory.takingMedication}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              name="haveAllergies"
              className="form-control"
              placeholder={t.allergies}
              value={medicalHistory.haveAllergies}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div className="form-check form-switch">
              <input name="allergicToLatex" className="form-check-input" type="checkbox" role="switchc" id="checkLAtex" checked={medicalHistory.allergicToLatex} onChange={() => handleToggle('allergicToLatex')} />
              <label className="form-check-label" htmlFor="allergicToLatex">{t.latex}</label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          {/* Header stays outside or in its own row so it spans the full width */}
          <h5 className="card-header mb-2">{t.haveOrhad}</h5>
          {/* Row 1 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.bloodPressure} onChange={() => handleToggle('bloodPressure')} />
                <label className="form-check-label" htmlFor="checkBloodPressure">{t.bloodPressure}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.epilepsy} onChange={() => handleToggle('epilepsy')} />
                <label className="form-check-label" htmlFor="checkepilepsy">{t.epilepsy}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.osteoporosis} onChange={() => handleToggle('osteoporosis')} />
                <label className="form-check-label" htmlFor="checkOsteoporosis">{t.osteoporosis}</label>
              </div>
            </div>
          </div>
          {/* Row 2 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.alcoholAddiction} onChange={() => handleToggle('alcoholAddiction')} />
                <label className="form-check-label" htmlFor="checkAlcoholAddiction">{t.alcoholAddiction}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.faintingSpells} onChange={() => handleToggle('faintingSpells')} />
                <label className="form-check-label" htmlFor="checkfaintingSpell">{t.faintingSpells}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.prolongedBleeding} onChange={() => handleToggle('prolongedBleeding')} />
                <label className="form-check-label" htmlFor="checkprolongedBleeding">{t.prolongedBleeding}</label>
              </div>
            </div>
          </div>
          {/* Row 3 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.anemia} onChange={() => handleToggle('anemia')} />
                <label className="form-check-label" htmlFor="checkanemia">{t.anemia}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.feverBlisters} onChange={() => handleToggle('feverBlisters')} />
                <label className="form-check-label" htmlFor="checkfeverBlisters">{t.feverBlisters}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.prostheticImplants} onChange={() => handleToggle('prostheticImplants')} />
                <label className="form-check-label" htmlFor="checkprostheticImplants">{t.prostheticImplants}</label>
              </div>
            </div>
          </div>
          {/* Row 4 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.anorexia} onChange={() => handleToggle('anorexia')} />
                <label className="form-check-label" htmlFor="checkanorexia">{t.anorexia}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.glaucoma} onChange={() => handleToggle('glaucoma')} />
                <label className="form-check-label" htmlFor="checkGlaucoma">{t.glaucoma}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.psychiatricCare} onChange={() => handleToggle('psychiatricCare')} />
                <label className="form-check-label" htmlFor="checkpsychiaricCare">{t.psychiatricCare}</label>
              </div>
            </div>
          </div>
          {/* Row 5 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.arthritisRheumatism} onChange={() => handleToggle('arthritisRheumatism')} />
                <label className="form-check-label" htmlFor="checkarthritisRheumatism">{t.arthritisRheumatism}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.hearingImpaired} onChange={() => handleToggle('hearingImpaired')} />
                <label className="form-check-label" htmlFor="checkhearingImpaired">{t.hearingImpaired}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.radiationTherapy} onChange={() => handleToggle('radiationTherapy')} />
                <label className="form-check-label" htmlFor="checkradiationTherapy">{t.radiationTherapy}</label>
              </div>
            </div>
          </div>
          {/* Row 6 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.artificialHeartValve} onChange={() => handleToggle('artificialHeartValve')} />
                <label className="form-check-label" htmlFor="checkartificialHeartValve">{t.artificialHeartValve}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.heartDiseaseSurgery} onChange={() => handleToggle('heartDiseaseSurgery')} />
                <label className="form-check-label" htmlFor="checkheartDiseaseSurgery">{t.heartDiseaseSurgery}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.recreationalDrugUse} onChange={() => handleToggle('recreationalDrugUse')} />
                <label className="form-check-label" htmlFor="checkrecreationalDrugUse">{t.recreationalDrugUse}</label>
              </div>
            </div>
          </div>
          {/* Row 7 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.artificialJoint} onChange={() => handleToggle('artificialJoint')} />
                <label className="form-check-label" htmlFor="checkartificialJoint">{t.artificialJoint}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.heartMurmur} onChange={() => handleToggle('heartMurmur')} />
                <label className="form-check-label" htmlFor="checkheartMurmur">{t.heartMurmur}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.removalofSpleen} onChange={() => handleToggle('removalofSpleen')} />
                <label className="form-check-label" htmlFor="checkremovalofSpleen">{t.removalofSpleen}</label>
              </div>
            </div>
          </div>
          {/* Row 8 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.asthma} onChange={() => handleToggle('asthma')} />
                <label className="form-check-label" htmlFor="checkasthma">{t.asthma}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.heartPacemaker} onChange={() => handleToggle('heartPacemaker')} />
                <label className="form-check-label" htmlFor="checkheartPacemaker">{t.heartPacemaker}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.rheumaticFever} onChange={() => handleToggle('rheumaticFever')} />
                <label className="form-check-label" htmlFor="checkrheumaticFever">{t.rheumaticFever}</label>
              </div>
            </div>
          </div>
          {/* Row 9 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.bulimia} onChange={() => handleToggle('bulimia')} />
                <label className="form-check-label" htmlFor="checkbulimia">{t.bulimia}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.hemophilia} onChange={() => handleToggle('hemophilia')} />
                <label className="form-check-label" htmlFor="checkhemophilia">{t.hemophilia}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.rheumaticHeartDisease} onChange={() => handleToggle('rheumaticHeartDisease')} />
                <label className="form-check-label" htmlFor="checkrheumaticHeartDisease">{t.rheumaticHeartDisease}</label>
              </div>
            </div>
          </div>
          {/* Row 10 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.cancer} onChange={() => handleToggle('cancer')} />
                <label className="form-check-label" htmlFor="checkcancer">{t.cancer}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.hepatitis} onChange={() => handleToggle('hepatitis')} />
                <label className="form-check-label" htmlFor="checkhepatitis">{t.hepatitis}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.sickleCellDisease} onChange={() => handleToggle('sickleCellDisease')} />
                <label className="form-check-label" htmlFor="checksickleCellDisease">{t.sickleCellDisease}</label>
              </div>
            </div>
          </div>
          {/* Row 11 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.chemicalDependency} onChange={() => handleToggle('chemicalDependency')} />
                <label className="form-check-label" htmlFor="checkchemicalDependency">{t.chemicalDependency}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.hivAids} onChange={() => handleToggle('hivAids')} />
                <label className="form-check-label" htmlFor="chckhivAids">{t.hivAids}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.sinusTrouble} onChange={() => handleToggle('sinusTrouble')} />
                <label className="form-check-label" htmlFor="checkSinusTrouble">{t.sinusTrouble}</label>
              </div>
            </div>
          </div>
          {/* Row 12 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.chemotherapy} onChange={() => handleToggle('chemotherapy')} />
                <label className="form-check-label" htmlFor="checkchemotherapy">{t.chemotherapy}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.kidneyProblems} onChange={() => handleToggle('kidneyProblems')} />
                <label className="form-check-label" htmlFor="checkkidneyProblems">{t.kidneyProblems}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.stroke} onChange={() => handleToggle('stroke')} />
                <label className="form-check-label" htmlFor="checkstroke">{t.stroke}</label>
              </div>
            </div>
          </div>
          {/* Row 13 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.chestPain} onChange={() => handleToggle('chestPain')} />
                <label className="form-check-label" htmlFor="checkchestPain">{t.chestPain}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.learningDisability} onChange={() => handleToggle('learningDisability')} />
                <label className="form-check-label" htmlFor="checklearningDisability">{t.learningDisability}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.thyroidDisease} onChange={() => handleToggle('thyroidDisease')} />
                <label className="form-check-label" htmlFor="checkthyrodiDisease">{t.thyroidDisease}</label>
              </div>
            </div>
          </div>
          {/* Row 14*/}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.congenitalHeartDisease} onChange={() => handleToggle('congenitalHeartDisease')} />
                <label className="form-check-label" htmlFor="checkcongenitalHeartDisease">{t.congenitalHeartDisease}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.liverDisease} onChange={() => handleToggle('liverDisease')} />
                <label className="form-check-label" htmlFor="checkliverDisease">{t.liverDisease}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.tuberculosis} onChange={() => handleToggle('tuberculosis')} />
                <label className="form-check-label" htmlFor="checktuberculosis">{t.tuberculosis}</label>
              </div>
            </div>
          </div>
          {/* Row 15 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.cortisoneMedicine} onChange={() => handleToggle('cortisoneMedicine')} />
                <label className="form-check-label" htmlFor="checkCortisoneMedicine">{t.cortisoneMedicine}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.lungDisease} onChange={() => handleToggle('lungDisease')} />
                <label className="form-check-label" htmlFor="checklungDisease">{t.lungDisease}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.tumors} onChange={() => handleToggle('tumors')} />
                <label className="form-check-label" htmlFor="checktumors">{t.tumors}</label>
              </div>
            </div>
          </div>
          {/* Row 16 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.diabetes} onChange={() => handleToggle('diabetes')} />
                <label className="form-check-label" htmlFor="checkdiabetes">{t.diabetes}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.mitralValveProlapse} onChange={() => handleToggle('mitralValveProlapse')} />
                <label className="form-check-label" htmlFor="checkmitralValveProlapse">{t.mitralValveProlapse}</label>
              </div>
            </div>
            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.ulcers} onChange={() => handleToggle('ulcers')} />
                <label className="form-check-label" htmlFor="checkulcers">{t.ulcers}</label>
              </div>
            </div>
          </div>
          {/* Row 17 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.emphysema} onChange={() => handleToggle('emphysema')} />
                <label className="form-check-label" htmlFor="checkeemphysema">{t.emphysema}</label>
              </div>
            </div>
            {/* Column 2 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.neurologicalDisorders} onChange={() => handleToggle('neurologicalDisorders')} />
                <label className="form-check-label" htmlFor="checkneurologicalDisorders">{t.neurologicalDisorders}</label>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.venerealDisease} onChange={() => handleToggle('venerealDisease')} />
                <label className="form-check-label" htmlFor="checkvenerealDisease">{t.venerealDisease}</label>
              </div>
            </div>
          </div>
          {/* Row 18 */}
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={medicalHistory.organTransplant} onChange={() => handleToggle('organTransplant')} />
                <label className="form-check-label" htmlFor="checkorganTransplant">{t.organTransplant}</label>
              </div>
            </div>
          </div>
          <br />
          <div className="row mb-3">
            <h6>{t.hospitalizationAccident}</h6>
            <div className="col">
              <input name="hospitalizationAccident" className="form-control" placeholder={t.ifYesExplain} value={medicalHistory.hospitalizationAccident} suppressHydrationWarning={true} onChange={handleChange} />
            </div>
          </div>
          {/* do you smoke question */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="smokeQuestion" className="form-label">{t.tabacco}</label>
              <input className="form-control" id="smokeQuestion" list="smokeQuestionanswers" name='smokeTabaccoProducts' placeholder={t.option} value={medicalHistory.smokeTabaccoProducts || ''} onChange={handleChange} />
              <datalist id="smokeQuestionanswers">
                <option value={t.iDontSmooke} />
                <option value={t.cigarrettes} />
                <option value={t.vape} />
                <option value={t.pipe} />
              </datalist>
            </div>
          </div>
          {/* do you drink alcohol? question */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="alcoholQuestion" className="form-label">{t.alcohol}</label>
              <input className="form-control" id="alcoholQuestion" list="alcoholQuestionanswers" name='drinkAlcohol' placeholder={t.option} value={medicalHistory.drinkAlcohol || ''} onChange={handleChange} />
              <datalist id="alcoholQuestionanswers">
                <option value={t.dontDrinkAlcohl} />
                <option value={t.drinkOccasionally} />
                <option value={t.drinkRegularly} />
              </datalist>
            </div>
          </div>
          {formData.sexAtBirth === t.female && (
            <>
              <div className="row mb-3">
                <h6 className="text-center">{t.onlyWomen}</h6>
                <div className="col-md-6">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" checked={medicalHistory.pregnant} onChange={() => handleToggle('pregnant')} />
                    <label className="form-check-label" htmlFor="checkpregnant">{t.pregnant}</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" checked={medicalHistory.nursing} onChange={() => handleToggle('nursing')} />
                    <label className="form-check-label" htmlFor="checkallergicnursing">{t.nursing}</label>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input name="nOfPregnancies" className="form-control" placeholder={t.nOfPregnancies} value={medicalHistory.nOfPregnancies} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <input name="nOfLivingChildren" className="form-control" placeholder={t.nOfLivingChildren} value={medicalHistory.nOfLivingChildren} onChange={handleChange} />
                </div>
              </div>
              <div className="row mb">
                <div className="col-md-12">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" checked={medicalHistory.birthControlMedication} onChange={() => handleToggle('birthControlMedication')} />
                    <label className="form-check-label" htmlFor="checkbirthControlMedication">{t.birthControlMedication}</label>
                  </div>
                </div>
                <div className="col-mb-12">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" checked={medicalHistory.becomingPregnant} onChange={() => handleToggle('becomingPregnant')} />
                    <label className="form-check-label" htmlFor="checkanticipateBecomingPregnant">{t.becomingPregnant}</label>
                  </div>
                </div>
              </div>
            </>)}
          <div className="row mb-3">
            <div className="col">
              <h4 className="card-header text-center">{t.dentalHistory}</h4>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label>{t.lastDentalVisit}</label>
              <input name="dateLastDentalVisit" type='date' className="form-control" value={dentalHistory.dateLastDentalVisit || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label>{t.dentalProblem}</label>
              <input name="problemBroughtYouIn" type='text' placeholder={t.ifYesExplain} className="form-control" value={dentalHistory.problemBroughtYouIn} onChange={handleChange} />
            </div>
          </div>
          {/* Question 1 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput" className="form-label">{t.gumsBleed}</label>
              <input className="form-control" id="answerOptionsInput" list="answerOptionsDetalist" name='gumsBleed' placeholder={t.option} value={dentalHistory.gumsBleed || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist">
                <option value={t.yes} />
                <option value={t.no} />
                <option value={t.sometimes} />
              </datalist>
            </div>
          </div>
          {/* Question 2 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput2" className="form-label">{t.tempSensitivity}</label>
              <input className="form-control" id="answerOptionsInput2" list="answerOptionsDetalist2" name='teethSensitiveToHotCold' placeholder={t.option} value={dentalHistory.teethSensitiveToHotCold || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist2">
                <option value={t.yes} />
                <option value={t.no} />
                <option value={t.sometimes} />
              </datalist>
            </div>
          </div>
          {/* Question 3 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput3" className="form-label">{t.tasteSensitivity}</label>
              <input className="form-control" list="answerOptionsDetalist3" id="answerOptionsInput3" name='teethSensitiveToSweets' placeholder={t.option} value={dentalHistory.teethSensitiveToSweets || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist3">
                <option value={t.yes} />
                <option value={t.no} />
                <option value={t.sometimes} />
              </datalist>
            </div>
          </div>
          {/* Question 4 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput4" className="form-label">{t.toothPain}</label>
              <input className="form-control" list="answerOptionsDetalist4" id="answerOptionsInput4" name='painTeeth' placeholder={t.option} value={dentalHistory.painTeeth || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist4">
                <option value={t.yes} />
                <option value={t.no} />
                <option value={t.sometimes} />
              </datalist>
            </div>
          </div>
          {/* Question 5 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput5" className="form-label">{t.mouthSore}</label>
              <input className="form-control" list="answerOptionsDetalist5" id="answerOptionsInput5" name='haveSoreOrLumpsInMouth' placeholder={t.option} value={dentalHistory.haveSoreOrLumpsInMouth || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist5">
                <option value={t.yes} />
                <option value={t.no} />
                {/* <option value={t.sometimes}/> */}
              </datalist>
            </div>
          </div>
          {/* Question 6 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput6" className="form-label">{t.jawInjury}</label>
              <input className="form-control" list="answerOptionsDetalist6" id="answerOptionsInput6" name='neckJawInjuries' placeholder={t.option} value={dentalHistory.neckJawInjuries || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist6">
                <option value={t.yes} />
                <option value={t.no} />
                {/* <option value={t.sometimes}/> */}
              </datalist>
            </div>
          </div>
          {/* Question 7 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput7" className="form-label">{t.headaches}</label>
              <input className="form-control" list="answerOptionsDetalist7" id="answerOptionsInput7" name='headaches' placeholder={t.option} value={dentalHistory.headaches || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist7">
                <option value={t.yes} />
                <option value={t.no} />
                <option value={t.sometimes} />
              </datalist>
            </div>
          </div>
          {/* Question 8 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput8" className="form-label">{t.grindTeeth}</label>
              <input className="form-control" list="answerOptionsDetalist8" id="answerOptionsInput8" name='grindTeeth' placeholder={t.option} value={dentalHistory.grindTeeth || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist8">
                <option value={t.yes} />
                <option value={t.no} />
                <option value={t.sometimes} />
              </datalist>
            </div>
          </div>
          {/* Question 9 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput9" className="form-label">{t.biteCheek}</label>
              <input className="form-control" list="answerOptionsDetalist9" id="answerOptionsInput9" name='biteCheeksLips' placeholder={t.option} value={dentalHistory.biteCheeksLips || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist9">
                <option value={t.yes} />
                <option value={t.no} />
                <option value={t.sometimes} />
              </datalist>
            </div>
          </div>
          {/* Question 10 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput10" className="form-label">{t.jawClick}</label>
              <input className="form-control" list="answerOptionsDetalist10" id="answerOptionsInput10" name='expereiencedClickingJaw' placeholder={t.option} value={dentalHistory.expereiencedClickingJaw || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist10">
                <option value={t.yes} />
                <option value={t.no} />
                <option value={t.sometimes} />
              </datalist>
            </div>
          </div>
          {/* Question 11 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput11" className="form-label">{t.facePain}</label>
              <input className="form-control" list="answerOptionsDetalist11" id="answerOptionsInput11" name='faceEarjointPain' placeholder={t.option} value={dentalHistory.faceEarjointPain || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist11">
                <option value={t.yes} />
                <option value={t.no} />
                <option value={t.sometimes} />
              </datalist>
            </div>
          </div>
          {/* Question 12 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput12" className="form-label">{t.mouthOpen}</label>
              <input className="form-control" list="answerOptionsDetalist12" id="answerOptionsInput12" name='difficultyOpeningMouth' placeholder={t.option} value={dentalHistory.difficultyOpeningMouth || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist12">
                <option value={t.yes} />
                <option value={t.no} />
                <option value={t.sometimes} />
              </datalist>
            </div>
          </div>
          {/* Question 13 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput13" className="form-label">{t.chewing}</label>
              <input className="form-control" list="answerOptionsDetalist13" id="answerOptionsInput13" name='difficultyChewing' placeholder={t.option} value={dentalHistory.difficultyChewing || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist13">
                <option value={t.yes} />
                <option value={t.no} />
                <option value={t.sometimes} />
              </datalist>
            </div>
          </div>
          {/* Question 14 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput14" className="form-label">{t.ortho}</label>
              <input className="form-control" list="answerOptionsDetalist14" id="answerOptionsInput14" name='orthodontic' placeholder={t.option} value={dentalHistory.orthodontic || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist14">
                <option value={t.yes} />
                <option value={t.no} />
              </datalist>
            </div>
          </div>
          {/* Question 15 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput15" className="form-label">{t.extractionBleed}</label>
              <input className="form-control" list="answerOptionsDetalist15" id="answerOptionsInput15" name='dentalProlongedBleeding' placeholder={t.option} value={dentalHistory.dentalProlongedBleeding || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist15">
                <option value={t.yes} />
                <option value={t.no} />
              </datalist>
            </div>
          </div>
          {/* Question 16 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput16" className="form-label">{t.brushingInstr}</label>
              <input className="form-control" list="answerOptionsDetalist16" id="answerOptionsInput16" name='instructioinsOfBrushing' placeholder={t.option} value={dentalHistory.instructioinsOfBrushing || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist16">
                <option value={t.yes} />
                <option value={t.no} />
              </datalist>
            </div>
          </div>
          {/* Question 17 */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput17" className="form-label">{t.gumInstr}</label>
              <input className="form-control" list="answerOptionsDetalist17" id="answerOptionsInput17" name='careOfGums' placeholder={t.option} value={dentalHistory.careOfGums || ''} onChange={handleChange} />
              <datalist id="answerOptionsDetalist17">
                <option value={t.yes} />
                <option value={t.no} />
              </datalist>
            </div>
          </div>
          {/* Comments */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="answerOptionsInput17" className="form-label">{t.comments}</label>
              <textarea
                className="form-control"
                id="answerOptionsInput17"
                name='dentalComments'
                placeholder={t.writeComments}
                style={{ minHeight: '100px', fontSize: '16px' }}
                value={dentalHistory.dentalComments || ''}
                onChange={handleChange}
                maxLength={500} // Limits input to 500 characters
              />

            </div>
          </div>

          {/* Disclaimer */}
          <div className="row mb-3">
            <div className="col">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{t.iHaveRead}<b><Link href="/privacy-policy" target="_blank" className="text-decoration-none">{t.noticePrivacy}</Link></b>{t.copy}</li>
                <li className="list-group-item">{t.authStaff}</li>
                <li className="list-group-item">{t.bySigningThisDoc} <b>{t.cancelPolicy}</b></li>
                <li className="list-group-item">{t.respCost} <b>{t.totalObligation}</b></li>
                <li className="list-group-item"><b>{t.certifyInfo}</b>{t.notHold}</li>
              </ul>
            </div>
          </div>

          <div className="row mb-3">
            <label className="form-label fs-4"><b>{t.signature}</b></label>
            <SignatureForm
              onSignatureChange={(dataUrl) => setSignatureImage(dataUrl)}
              clearLabel={t.clearSig} />
            <br />
            <div className="mt-4">
              <Button variant="primary" type="submit" className="me-2">
                {t.send}
              </Button>

              <Button variant="secondary" type="button" onClick={handleClear}>
                {t.clearForm}
              </Button>
            </div>
          </div>


        </div>
      </div>

    </Form >
  </Container >
);
}