import { useState, useRef, useCallback, useEffect } from "react";

const FULL_POLICY_DB = [

  // ═══════════════════════════════════════════════════════════
  // STAR HEALTH AND ALLIED INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"star-001", insurer:"Star Health", product:"Star Comprehensive Insurance Policy",
    tpa:"Star Health (In-house)", type:"Individual / Family Floater",
    sumInsured:[5,10,15,20,25,50], premium_indicative:"₹8,500+/yr",
    networkHospitals:14000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Fistula in ano":12,"Piles / Haemorrhoids":12,"Sinusitis (all types)":12,"Tonsillitis":12,"Adenoids":12,"Deviated nasal septum":12,"Knee replacement":24,"Hip replacement":24,"Shoulder replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Endometriosis":24,"Prolapse of inter-vertebral disc":24,"Calculus diseases (all)":12,"Gall bladder stones":12,"Kidney / ureteric stones":12,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Hypospadias":12,"Congenital internal diseases":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":36,"Myopia >7.5 diopter":24 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0, senior_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":40000, "AYUSH treatment":25000 },
    maternity:{ covered:true, waitingPeriod:12, normalDelivery:25000, cSection:50000 },
    daycare:true, restoration:true, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"4 hrs (planned), immediate (emergency)",
    highlights:["No room rent cap","No copay","Recharge benefit","14k+ hospitals"],
    exclusions_specific:["Cosmetic / aesthetic treatment","Obesity (BMI<40)","Dental (non-accident)","Experimental","Self-inflicted","War / nuclear","Substance abuse","HIV/AIDS","IVF / Infertility","External congenital"],
    disclosureRequired:["Diabetes","Hypertension","Heart disease","Cancer history","Kidney disease","Thyroid","Asthma","Arthritis","Surgery in last 5 yrs","Hospitalization last 3 yrs"]
  },
  {
    id:"star-002", insurer:"Star Health", product:"Star Family Health Optima",
    tpa:"Star Health (In-house)", type:"Family Floater",
    sumInsured:[3,4,5,10,15,20,25], premium_indicative:"₹7,200+/yr",
    networkHospitals:14000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Fistula in ano":12,"Piles / Haemorrhoids":12,"Sinusitis":12,"Tonsillitis":12,"Deviated nasal septum":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Calculus diseases":12,"Gall bladder stones":12,"Kidney / ureteric stones":12,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":40000 },
    maternity:{ covered:true, waitingPeriod:36, normalDelivery:15000, cSection:25000 },
    daycare:true, restoration:true, ncb:"5% per year up to 100% — Auto Recharge",
    reimbursementTimeline:"30 days", cashlessPreAuth:"4 hrs prior",
    highlights:["Auto recharge","Floater design","Multiplier benefit"],
    exclusions_specific:["Cosmetic","Obesity","Dental (non-accident)","Experimental","Self-inflicted","War","HIV/AIDS","IVF"],
    disclosureRequired:["Diabetes","Hypertension","Heart disease","Cancer","Kidney disease","Thyroid","Asthma","Surgery last 5 yrs"]
  },
  {
    id:"star-003", insurer:"Star Health", product:"Star Senior Citizens Red Carpet",
    tpa:"Star Health (In-house)", type:"Individual (60–75 yrs)",
    sumInsured:[1,2,3,4,5,10,15,20,25], premium_indicative:"₹15,000+/yr",
    networkHospitals:14000,
    waitingPeriods:{ initial:30, ped:12,
      specificIllness:{ "Cataract":12,"Hernia":12,"Hydrocele":12,"Piles":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":12,"Fibroid uterus":12,"Gall bladder stones":12,"Kidney stones":12,"Benign prostatic hypertrophy":12,"Diabetes (complications)":12,"Hypertension (complications)":12,"Psychiatric illness":24 }
    },
    copay:{ applicable:true, percent:30, ped_copay:30 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent cap" },
    subLimits:{ "Cataract (per eye)":20000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["No pre-policy health check up to 75","PED covered from year 1 (30% copay)","Designed for seniors"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","Self-inflicted","War","HIV","IVF"],
    disclosureRequired:["All chronic conditions mandatory","All medications","All surgeries","All hospitalizations last 10 yrs","Organ transplants"]
  },
  {
    id:"star-004", insurer:"Star Health", product:"Star Cardiac Care Gold",
    tpa:"Star Health (In-house)", type:"Individual (cardiac patients)",
    sumInsured:[3,5,7,10], premium_indicative:"₹22,000+/yr",
    networkHospitals:14000,
    waitingPeriods:{ initial:30, ped:0,
      specificIllness:{ "Angioplasty":0,"Bypass surgery":0,"Valve replacement":0,"Pacemaker":0,"Cataract":24,"Hernia":24,"Knee replacement":24 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"24 hrs prior",
    highlights:["Covers existing cardiac conditions from day 1","Second opinion benefit","Health checkup included"],
    exclusions_specific:["Non-cardiac experimental treatment","Obesity","Cosmetic","Dental","IVF"],
    disclosureRequired:["Full cardiac history mandatory","All cardiac procedures","Current cardiac medications","Other chronic conditions"]
  },
  {
    id:"star-005", insurer:"Star Health", product:"Star Criticare Plus",
    tpa:"Star Health (In-house)", type:"Individual",
    sumInsured:[1,2,3,4,5,10,15,20,25], premium_indicative:"₹6,500+/yr",
    networkHospitals:14000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Knee replacement":24,"Hip replacement":24,"Piles":12,"Sinusitis":12,"Fibroid uterus":24,"Gall bladder stones":12,"Kidney stones":12,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No sub-limit" },
    subLimits:{ "Cataract (per eye)":30000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:true, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"4 hrs prior",
    highlights:["Critical illness lump sum + hospitalization","Dual cover"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart disease","Cancer","Kidney","Surgery last 5 yrs"]
  },
  {
    id:"star-006", insurer:"Star Health", product:"Star Women Care",
    tpa:"Star Health (In-house)", type:"Individual (Women)",
    sumInsured:[5,10,15,20,25,50], premium_indicative:"₹9,000+/yr",
    networkHospitals:14000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia":24,"Fibroid uterus":12,"Endometriosis":12,"Polycystic ovarian disease":12,"Ovarian cyst":12,"Cervical cancer":36,"Breast cancer":36,"Piles":12,"Sinusitis":12,"Gall bladder stones":12,"Kidney stones":12 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":40000 },
    maternity:{ covered:true, waitingPeriod:12, normalDelivery:50000, cSection:75000 },
    daycare:true, restoration:true, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"4 hrs prior",
    highlights:["Women-specific coverage","Maternity + newborn cover","Fertility cover add-on","Shorter PCOS wait"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","Self-inflicted","War","HIV"],
    disclosureRequired:["Diabetes","Hypertension","Cancer history","Gynaecological conditions","Thyroid","Surgery last 5 yrs"]
  },
  {
    id:"star-007", insurer:"Star Health", product:"Star Micro Rural Health Care",
    tpa:"Star Health (In-house)", type:"Individual / Family (Rural)",
    sumInsured:[0.5,1,1.5,2,2.5], premium_indicative:"₹1,200+/yr",
    networkHospitals:14000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":12,"Sinusitis":12,"Gall bladder stones":24,"Kidney stones":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"fixed", limit:2000, icu:4000, note:"₹2000/day room, ₹4000/day ICU" },
    subLimits:{ "Cataract (per eye)":10000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"4 hrs prior",
    highlights:["Affordable premium for rural population","Low sum insured options"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart disease","Cancer","Surgery last 3 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // NIVA BUPA HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"nivabupa-001", insurer:"Niva Bupa", product:"ReAssure 2.0",
    tpa:"Niva Bupa (In-house)", type:"Individual / Family Floater",
    sumInsured:[3,5,7,10,15,20,30,50,100], premium_indicative:"₹9,200+/yr",
    networkHospitals:10000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Fistula in ano":12,"Piles / Haemorrhoids":12,"Sinusitis":12,"Tonsillitis":12,"Adenoids":12,"Deviated nasal septum":12,"Knee replacement":24,"Hip replacement":24,"Shoulder replacement":24,"Varicose veins":12,"Fibroid uterus":24,"Endometriosis":24,"Calculus diseases":12,"Gall bladder stones":12,"Kidney / ureteric stones":12,"Polycystic ovarian disease":12,"Benign prostatic hypertrophy":12,"Diabetes (complications)":36,"Hypertension (complications)":36,"Psychiatric illness":24,"Prolapsed disc":24 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":50000 },
    maternity:{ covered:true, waitingPeriod:9, normalDelivery:50000, cSection:75000 },
    daycare:true, restoration:true, ncb:"Lock the Clock — sum insured never reduces on claim",
    reimbursementTimeline:"15 days", cashlessPreAuth:"48 hrs (planned), immediate (emergency)",
    highlights:["Lock the Clock NCB","36-month PED wait","Fast 15-day settlement","Direct settlement — no separate TPA"],
    exclusions_specific:["Cosmetic","Dental (non-accident)","Obesity","Experimental","HIV/AIDS","Self-inflicted","War","IVF","External congenital"],
    disclosureRequired:["Diabetes","Hypertension","Cardiac","Cancer","Kidney","Liver","Thyroid","Respiratory","Neurological","Psychiatric","Surgery / hospitalization last 5 yrs"]
  },
  {
    id:"nivabupa-002", insurer:"Niva Bupa", product:"Senior First",
    tpa:"Niva Bupa (In-house)", type:"Individual (60+)",
    sumInsured:[3,5,10,15,20,25], premium_indicative:"₹18,000+/yr",
    networkHospitals:10000,
    waitingPeriods:{ initial:30, ped:24,
      specificIllness:{ "Cataract":12,"Hernia":12,"Hydrocele":12,"Piles":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":12,"Fibroid uterus":12,"Gall bladder stones":12,"Kidney stones":12,"Benign prostatic hypertrophy":12,"Diabetes (complications)":24,"Hypertension (complications)":24,"Psychiatric illness":36 }
    },
    copay:{ applicable:true, percent:20, ped_copay:20 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent cap" },
    subLimits:{ "Cataract (per eye)":40000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Senior-specific","24-month PED wait (shorter)","20% copay on all claims"],
    exclusions_specific:["Cosmetic","Dental","HIV","Self-harm","War","Obesity","IVF","Experimental"],
    disclosureRequired:["All chronic conditions mandatory","All medications (10 yr history)","All surgeries","All hospitalizations"]
  },
  {
    id:"nivabupa-003", insurer:"Niva Bupa", product:"Health Companion",
    tpa:"Niva Bupa (In-house)", type:"Individual / Family Floater",
    sumInsured:[3,5,7.5,10,15,20,30,50], premium_indicative:"₹7,500+/yr",
    networkHospitals:10000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent cap" },
    subLimits:{ "Cataract (per eye)":40000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"10% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Value plan","Wide SI range","10k+ hospitals"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Surgery last 5 yrs"]
  },
  {
    id:"nivabupa-004", insurer:"Niva Bupa", product:"Aspire",
    tpa:"Niva Bupa (In-house)", type:"Individual / Family Floater",
    sumInsured:[3,5,10,15,20,50,100,300], premium_indicative:"₹11,000+/yr",
    networkHospitals:10000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":12,"Fibroid uterus":24,"Gall bladder stones":12,"Kidney stones":12,"Polycystic ovarian disease":12,"Benign prostatic hypertrophy":12,"Diabetes (complications)":36,"Hypertension (complications)":36,"Psychiatric illness":24 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:24, normalDelivery:60000, cSection:100000 },
    daycare:true, restoration:true, ncb:"No Claim Bonus Shield",
    reimbursementTimeline:"15 days", cashlessPreAuth:"48 hrs prior",
    highlights:["No sublimits on higher SI","Maternity included","Strong restoration"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Cardiac","Cancer","Kidney","Liver","Thyroid","Surgery / hospitalization last 5 yrs"]
  },
  {
    id:"nivabupa-005", insurer:"Niva Bupa", product:"Health Premia",
    tpa:"Niva Bupa (In-house)", type:"Individual / Family Floater",
    sumInsured:[5,10,15,20,30,50,100], premium_indicative:"₹13,500+/yr",
    networkHospitals:10000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":12,"Sinusitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":12,"Fibroid uterus":24,"Gall bladder stones":12,"Kidney stones":12,"Polycystic ovarian disease":12,"Benign prostatic hypertrophy":12,"Diabetes (complications)":36,"Hypertension (complications)":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:12, normalDelivery:75000, cSection:125000 },
    daycare:true, restoration:true, ncb:"Lock the Clock + 20% per year",
    reimbursementTimeline:"15 days", cashlessPreAuth:"24 hrs prior",
    highlights:["International cover add-on","Comprehensive maternity","No sublimits","Premium plan"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Cardiac","Cancer","Kidney","Liver","Thyroid","All surgeries / hospitalizations"]
  },

  // ═══════════════════════════════════════════════════════════
  // HDFC ERGO HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"hdfc-001", insurer:"HDFC Ergo", product:"Optima Secure",
    tpa:"HDFC Ergo (In-house)", type:"Individual / Family Floater",
    sumInsured:[5,10,15,20,25,50,100,200], premium_indicative:"₹10,500+/yr",
    networkHospitals:13000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Fistula in ano":24,"Piles / Haemorrhoids":24,"Sinusitis":24,"Tonsillitis":24,"Adenoids":24,"Deviated nasal septum":24,"Knee replacement":24,"Hip replacement":24,"Shoulder replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Endometriosis":24,"Calculus diseases":24,"Gall bladder stones":24,"Kidney / ureteric stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":36,"Hypertension (complications)":36,"Psychiatric illness":36,"Prolapsed disc":24 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":100000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:true, ncb:"Secure Benefit — 50% increase per year up to 100%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"72 hrs (planned), 24 hrs (emergency)",
    highlights:["Secure benefit doubles SI","No room rent cap","13k+ hospitals","Restore benefit"],
    exclusions_specific:["Cosmetic / aesthetic","Weight reduction","Dental (non-accident)","Experimental","HIV / AIDS","Substance abuse","Self-inflicted","War","IVF / ART","External congenital"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Stroke","Cancer","Kidney","Liver","Thyroid","COPD / Asthma","Hospitalization last 3 yrs","Surgery last 5 yrs","Current medications"]
  },
  {
    id:"hdfc-002", insurer:"HDFC Ergo", product:"Optima Restore",
    tpa:"HDFC Ergo (In-house)", type:"Individual / Family Floater",
    sumInsured:[3,5,10,15,20,25,50], premium_indicative:"₹8,200+/yr",
    networkHospitals:13000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":36,"Hypertension (complications)":36,"Psychiatric illness":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":50000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:true, ncb:"Restore Benefit — SI restored after 1st claim",
    reimbursementTimeline:"30 days", cashlessPreAuth:"72 hrs prior",
    highlights:["Restore benefit on 1st claim","No room rent cap","Value for mid-segment"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","Self-inflicted","War","IVF"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Surgery last 5 yrs"]
  },
  {
    id:"hdfc-003", insurer:"HDFC Ergo", product:"Health Suraksha",
    tpa:"HDFC Ergo (In-house)", type:"Individual / Family Floater",
    sumInsured:[3,5,7.5,10,15], premium_indicative:"₹5,800+/yr",
    networkHospitals:13000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":24,"Sinusitis":24,"Knee replacement":48,"Hip replacement":48,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"percent_si", limit:1, icu:2, note:"1% of SI per day room; 2% ICU" },
    subLimits:{ "Cataract (per eye)":25000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"72 hrs prior",
    highlights:["Entry-level product","Affordable","Room rent 1% SI — key risk"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","Self-inflicted","War","IVF"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },
  {
    id:"hdfc-004", insurer:"HDFC Ergo", product:"My:Health Suraksha Silver Smart",
    tpa:"HDFC Ergo (In-house)", type:"Individual / Family Floater",
    sumInsured:[3,5,7.5,10,15,20,25,50,100,200,500], premium_indicative:"₹7,000+/yr",
    networkHospitals:13000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":24,"Sinusitis":24,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":36,"Hypertension (complications)":36,"Psychiatric illness":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":50000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:true, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"72 hrs prior",
    highlights:["No room rent cap","Wide SI range","Flexible plan"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // CARE HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"care-001", insurer:"Care Health Insurance", product:"Care Supreme",
    tpa:"Care Health (In-house)", type:"Individual / Family Floater",
    sumInsured:[5,7,10,15,20,25,30,50,100], premium_indicative:"₹7,800+/yr",
    networkHospitals:19000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":12,"Hernia (all types)":12,"Hydrocele":12,"Fistula in ano":12,"Piles / Haemorrhoids":12,"Sinusitis":12,"Tonsillitis":12,"Adenoids":12,"Deviated nasal septum":12,"Knee replacement":24,"Hip replacement":24,"Shoulder replacement":24,"Varicose veins":12,"Fibroid uterus":24,"Endometriosis":24,"Calculus diseases":12,"Gall bladder stones":12,"Kidney / ureteric stones":12,"Polycystic ovarian disease":12,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":48,"Prolapsed disc":24 }
    },
    copay:{ applicable:false, percent:0, ped_copay:20 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":30000 },
    maternity:{ covered:true, waitingPeriod:24, normalDelivery:25000, cSection:35000 },
    daycare:true, restoration:true, ncb:"10% per claim-free year up to 50%",
    reimbursementTimeline:"21 days", cashlessPreAuth:"48 hrs prior",
    highlights:["19k+ hospitals — India's largest network","Short specific illness waits","PED copay 20% applies"],
    exclusions_specific:["Cosmetic","Dental (non-accident)","HIV/AIDS","Obesity/weight control","Experimental","War/nuclear","Self-inflicted","Infertility/IVF","External congenital"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Asthma","Arthritis","Neurological","Surgery last 5 yrs"]
  },
  {
    id:"care-002", insurer:"Care Health Insurance", product:"Care Classic",
    tpa:"Care Health (In-house)", type:"Individual / Family Floater",
    sumInsured:[4,5,7,10,15,20], premium_indicative:"₹5,500+/yr",
    networkHospitals:19000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":12,"Kidney stones":12,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"percent_si", limit:1, icu:2, note:"1% of SI per day" },
    subLimits:{ "Cataract (per eye)":20000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Large network","Affordable","Room rent 1% SI — risk"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },
  {
    id:"care-003", insurer:"Care Health Insurance", product:"Care Plus",
    tpa:"Care Health (In-house)", type:"Individual / Family Floater",
    sumInsured:[10,15,20,30,50,75,100], premium_indicative:"₹10,500+/yr",
    networkHospitals:19000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":12,"Hernia":12,"Piles":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":12,"Fibroid uterus":24,"Gall bladder stones":12,"Kidney stones":12,"Polycystic ovarian disease":12,"Benign prostatic hypertrophy":12,"Diabetes (complications)":36,"Hypertension (complications)":36,"Psychiatric illness":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:12, normalDelivery:50000, cSection:75000 },
    daycare:true, restoration:true, ncb:"15% per year up to 100%",
    reimbursementTimeline:"15 days", cashlessPreAuth:"24 hrs prior",
    highlights:["Premium offering","No sublimits","Short specific illness waits","Strong NCB"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Cardiac","Cancer","Kidney","Liver","Thyroid","Surgery / hospitalization"]
  },
  {
    id:"care-004", insurer:"Care Health Insurance", product:"Care Senior",
    tpa:"Care Health (In-house)", type:"Individual (60+)",
    sumInsured:[3,5,10,15,20,25], premium_indicative:"₹16,000+/yr",
    networkHospitals:19000,
    waitingPeriods:{ initial:30, ped:24,
      specificIllness:{ "Cataract":12,"Hernia":12,"Piles":12,"Sinusitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":12,"Gall bladder stones":12,"Kidney stones":12,"Benign prostatic hypertrophy":12,"Diabetes (complications)":24,"Hypertension (complications)":24 }
    },
    copay:{ applicable:true, percent:20, ped_copay:20 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":25000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"21 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Senior-specific","24-month PED","19k+ hospitals","20% copay"],
    exclusions_specific:["Cosmetic","Dental","HIV","Obesity","Experimental","IVF","Self-inflicted","War"],
    disclosureRequired:["All chronic conditions mandatory","All medications","All surgeries","Hospitalization last 10 yrs"]
  },
  {
    id:"care-005", insurer:"Care Health Insurance", product:"Care Heart",
    tpa:"Care Health (In-house)", type:"Individual (cardiac patients)",
    sumInsured:[3,5,7,10,15], premium_indicative:"₹20,000+/yr",
    networkHospitals:19000,
    waitingPeriods:{ initial:30, ped:0,
      specificIllness:{ "Cardiac procedures":0,"Angioplasty":0,"Bypass":0,"Cataract":24,"Hernia":24,"Knee replacement":24 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"21 days", cashlessPreAuth:"24 hrs prior",
    highlights:["Covers existing cardiac conditions from day 1","Annual heart health check","Cardiac specialist consult"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF"],
    disclosureRequired:["Full cardiac history mandatory","All cardiac medications","Other chronic conditions"]
  },

  // ═══════════════════════════════════════════════════════════
  // ICICI LOMBARD HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"icici-001", insurer:"ICICI Lombard", product:"Elevate",
    tpa:"ICICI Lombard (In-house)", type:"Individual / Family Floater",
    sumInsured:[5,10,15,20,25,50,100,200,500,1000], premium_indicative:"₹11,000+/yr",
    networkHospitals:10000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Fistula in ano":24,"Piles / Haemorrhoids":24,"Sinusitis":24,"Tonsillitis":24,"Adenoids":24,"Deviated nasal septum":24,"Knee replacement":24,"Hip replacement":24,"Shoulder replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Endometriosis":24,"Calculus diseases":24,"Gall bladder stones":24,"Kidney / ureteric stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":36,"Hypertension (complications)":36,"Psychiatric illness":36,"Prolapsed disc":24 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No sub-limit" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:12, normalDelivery:75000, cSection:100000 },
    daycare:true, restoration:true, ncb:"Cumulative 10% per year up to 100%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"Digital pre-auth via app — 24 hrs prior",
    highlights:["Unlimited SI option","No sublimits","Digital pre-auth","Strong maternity"],
    exclusions_specific:["Cosmetic","Dental (non-accident)","Obesity","Experimental","HIV","War","Self-harm","IVF"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Liver","Thyroid","Neuro","Psychiatric","Surgery history","Hospitalization history","Current medications","Smoking / alcohol"]
  },
  {
    id:"icici-002", insurer:"ICICI Lombard", product:"Complete Health Insurance",
    tpa:"ICICI Lombard (In-house)", type:"Individual / Family Floater",
    sumInsured:[3,5,7.5,10,15,20,25,50], premium_indicative:"₹7,500+/yr",
    networkHospitals:10000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":40000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"24 hrs prior",
    highlights:["Established product","No room rent cap","10k+ hospitals"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Surgery last 5 yrs"]
  },
  {
    id:"icici-003", insurer:"ICICI Lombard", product:"iHealth",
    tpa:"ICICI Lombard (In-house)", type:"Individual / Family Floater",
    sumInsured:[2,3,4,5,7.5,10,15,20], premium_indicative:"₹5,500+/yr",
    networkHospitals:10000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":24,"Sinusitis":24,"Knee replacement":48,"Hip replacement":48,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"percent_si", limit:1, icu:2, note:"1% of SI / day" },
    subLimits:{ "Cataract (per eye)":25000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"24 hrs prior",
    highlights:["Entry level","Room rent 1% SI — risk","Affordable premium"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // BAJAJ ALLIANZ HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"bajaj-001", insurer:"Bajaj Allianz", product:"Health Guard Gold",
    tpa:"Bajaj Allianz (In-house)", type:"Individual / Family Floater",
    sumInsured:[1.5,2,3,4,5,7.5,10,15,20,30,50], premium_indicative:"₹6,500+/yr",
    networkHospitals:8000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Fistula in ano":24,"Piles / Haemorrhoids":24,"Sinusitis":24,"Tonsillitis":24,"Adenoids":24,"Deviated nasal septum":24,"Knee replacement":48,"Hip replacement":48,"Shoulder replacement":48,"Varicose veins":24,"Fibroid uterus":24,"Calculus diseases":24,"Gall bladder stones":24,"Kidney / ureteric stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":48,"Prolapsed disc":24 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"percent_si", limit:1, icu:2, note:"1% of SI per day for room; 2% for ICU" },
    subLimits:{ "Cataract (per eye)":25000, "Internal congenital":50000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"10% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"3 days prior (planned), 24 hrs (emergency)",
    highlights:["Wide SI range","Affordable","Room rent 1% SI — KEY RISK for metro hospitals","Knee/hip wait 48 months"],
    exclusions_specific:["Cosmetic","Dental (non-accident)","Obesity","Experimental","HIV","War","Self-harm","IVF","Genetic disorder"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Any surgery","Hospitalization last 3 yrs"]
  },
  {
    id:"bajaj-002", insurer:"Bajaj Allianz", product:"Global Health Care",
    tpa:"Bajaj Allianz (In-house)", type:"Individual / Family Floater",
    sumInsured:[50,100,200,500,750,1000], premium_indicative:"₹35,000+/yr",
    networkHospitals:8000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia":24,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Gall bladder stones":24,"Kidney stones":24,"Diabetes (complications)":36,"Hypertension (complications)":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:24, normalDelivery:100000, cSection:150000 },
    daycare:true, restoration:true, ncb:"10% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"72 hrs prior",
    highlights:["International cover","High SI","No sublimits","Maternity included"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","Self-inflicted","War","IVF"],
    disclosureRequired:["All chronic conditions","All surgeries","All hospitalizations","Current medications"]
  },
  {
    id:"bajaj-003", insurer:"Bajaj Allianz", product:"Health Infinity",
    tpa:"Bajaj Allianz (In-house)", type:"Individual / Family Floater",
    sumInsured:[100,200,300,500,750,1000], premium_indicative:"₹28,000+/yr",
    networkHospitals:8000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia":24,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Gall bladder stones":24,"Kidney stones":24,"Diabetes (complications)":36,"Hypertension (complications)":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:12, normalDelivery:100000, cSection:150000 },
    daycare:true, restoration:true, ncb:"10% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"72 hrs prior",
    highlights:["Unlimited renewals","No copay","Super top-up compatible","Premium plan"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["All chronic conditions mandatory","All surgeries","All hospitalizations"]
  },

  // ═══════════════════════════════════════════════════════════
  // ADITYA BIRLA HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"abhi-001", insurer:"Aditya Birla Health Insurance", product:"Activ One",
    tpa:"Aditya Birla (In-house)", type:"Individual / Family Floater",
    sumInsured:[5,10,15,20,30,50,100], premium_indicative:"₹9,800+/yr",
    networkHospitals:11000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Fistula in ano":12,"Piles / Haemorrhoids":12,"Sinusitis":12,"Tonsillitis":12,"Adenoids":12,"Deviated nasal septum":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Endometriosis":24,"Calculus diseases":12,"Gall bladder stones":12,"Kidney / ureteric stones":12,"Polycystic ovarian disease":12,"Benign prostatic hypertrophy":24,"Diabetes (complications)":36,"Hypertension (complications)":36,"Psychiatric illness":36,"Prolapsed disc":24 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:12, normalDelivery:50000, cSection:75000 },
    daycare:true, restoration:true, ncb:"HealthReturns — earn back premium via fitness activity",
    reimbursementTimeline:"15 days", cashlessPreAuth:"Pre-auth via app — 24 hrs prior",
    highlights:["HealthReturns wellness incentive","36-month PED wait","No sublimits","Fast 15-day settlement"],
    exclusions_specific:["Cosmetic","Dental (non-accident)","Obesity","Experimental","HIV","War","Self-harm","IVF"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Neuro","Respiratory","Surgery","Hospitalization last 5 yrs"]
  },
  {
    id:"abhi-002", insurer:"Aditya Birla Health Insurance", product:"Activ Assure Diamond",
    tpa:"Aditya Birla (In-house)", type:"Individual / Family Floater",
    sumInsured:[2,3,4,5,7,10,15,20,25,50,100], premium_indicative:"₹7,200+/yr",
    networkHospitals:11000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":12,"Kidney stones":12,"Polycystic ovarian disease":12,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":40000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:true, ncb:"10% per year up to 50% — Cumulative Bonus Booster",
    reimbursementTimeline:"21 days", cashlessPreAuth:"24 hrs prior",
    highlights:["HealthReturns benefit","No room rent cap","11k+ hospitals"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Surgery last 5 yrs"]
  },
  {
    id:"abhi-003", insurer:"Aditya Birla Health Insurance", product:"Activ Health Platinum Enhanced",
    tpa:"Aditya Birla (In-house)", type:"Individual / Family Floater",
    sumInsured:[2,3,4,5,10,15,20,25,50,100], premium_indicative:"₹8,500+/yr",
    networkHospitals:11000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":12,"Fibroid uterus":24,"Gall bladder stones":12,"Kidney stones":12,"Polycystic ovarian disease":12,"Benign prostatic hypertrophy":12,"Diabetes (complications)":36,"Hypertension (complications)":36,"Psychiatric illness":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:24, normalDelivery:50000, cSection:75000 },
    daycare:true, restoration:true, ncb:"Chronic Management Program benefit",
    reimbursementTimeline:"15 days", cashlessPreAuth:"24 hrs prior",
    highlights:["Chronic disease management benefit","HealthReturns","Shorter PED wait"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Surgery / hospitalization"]
  },

  // ═══════════════════════════════════════════════════════════
  // TATA AIG HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"tataaig-001", insurer:"Tata AIG", product:"Medicare Premier",
    tpa:"Tata AIG (In-house)", type:"Individual / Family Floater",
    sumInsured:[5,10,15,20,25,50,100,150,200], premium_indicative:"₹9,500+/yr",
    networkHospitals:10000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Fistula in ano":24,"Piles / Haemorrhoids":24,"Sinusitis":24,"Tonsillitis":24,"Adenoids":24,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Calculus diseases":24,"Gall bladder stones":24,"Kidney / ureteric stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":36,"Hypertension (complications)":36,"Psychiatric illness":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:24, normalDelivery:50000, cSection:75000 },
    daycare:true, restoration:true, ncb:"10% per year up to 150%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["No sublimits","Strong NCB up to 150%","No room rent cap","Maternity included"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Liver","Thyroid","Surgery / hospitalization"]
  },
  {
    id:"tataaig-002", insurer:"Tata AIG", product:"Medicare",
    tpa:"Tata AIG (In-house)", type:"Individual / Family Floater",
    sumInsured:[2,3,5,7,10,15,20,25,50], premium_indicative:"₹6,500+/yr",
    networkHospitals:10000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":40000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["No room rent cap","10k+ hospitals","Trusted brand"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Surgery last 5 yrs"]
  },
  {
    id:"tataaig-003", insurer:"Tata AIG", product:"MediCare Protect",
    tpa:"Tata AIG (In-house)", type:"Super Top-Up",
    sumInsured:[5,10,15,20,25,50], premium_indicative:"₹2,800+/yr",
    networkHospitals:10000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Knee replacement":24,"Hip replacement":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Super top-up","Low premium","Good for topping existing corporate cover"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // RELIANCE HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"reliance-001", insurer:"Reliance Health Insurance", product:"Health Gain",
    tpa:"Reliance Health (In-house)", type:"Individual / Family Floater",
    sumInsured:[3,5,7,10,15,20], premium_indicative:"₹7,200+/yr",
    networkHospitals:8500,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":12,"Fistula in ano":12,"Piles / Haemorrhoids":12,"Sinusitis":12,"Tonsillitis":12,"Adenoids":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":12,"Fibroid uterus":24,"Calculus diseases":12,"Gall bladder stones":12,"Kidney / ureteric stones":12,"Polycystic ovarian disease":12,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent cap" },
    subLimits:{ "Cataract (per eye)":30000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:true, ncb:"10% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["No room rent cap","Short specific illness waits","Restoration benefit"],
    exclusions_specific:["Cosmetic","Dental","HIV","Obesity","Experimental","War","Self-harm","IVF"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Any surgery","Hospitalization last 3 yrs"]
  },
  {
    id:"reliance-002", insurer:"Reliance Health Insurance", product:"Health Infinity",
    tpa:"Reliance Health (In-house)", type:"Individual / Family Floater",
    sumInsured:[10,15,20,30,50,100], premium_indicative:"₹12,000+/yr",
    networkHospitals:8500,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":12,"Sinusitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":12,"Fibroid uterus":24,"Gall bladder stones":12,"Kidney stones":12,"Polycystic ovarian disease":12,"Benign prostatic hypertrophy":12,"Diabetes (complications)":36,"Hypertension (complications)":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:24, normalDelivery:50000, cSection:75000 },
    daycare:true, restoration:true, ncb:"15% per year up to 75%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["No sublimits","Maternity included","Strong NCB","Shorter PED wait"],
    exclusions_specific:["Cosmetic","Dental","HIV","Obesity","Experimental","War","Self-harm","IVF"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Liver","Thyroid","Surgery / hospitalization"]
  },

  // ═══════════════════════════════════════════════════════════
  // SBI HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"sbi-001", insurer:"SBI Health Insurance", product:"Arogya Supreme",
    tpa:"Medi Assist", type:"Individual / Family Floater",
    sumInsured:[3,5,10,15,20,25,50], premium_indicative:"₹7,000+/yr",
    networkHospitals:6000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Piles / Haemorrhoids":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Calculus diseases":24,"Gall bladder stones":24,"Kidney stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":35000 },
    maternity:{ covered:true, waitingPeriod:24, normalDelivery:25000, cSection:40000 },
    daycare:true, restoration:true, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Backed by SBI brand","Restoration benefit","Maternity included"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Surgery last 5 yrs"]
  },
  {
    id:"sbi-002", insurer:"SBI Health Insurance", product:"Arogya Premier",
    tpa:"Medi Assist", type:"Individual / Family Floater",
    sumInsured:[10,15,20,30,50,100], premium_indicative:"₹12,500+/yr",
    networkHospitals:6000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":24,"Sinusitis":24,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":36,"Hypertension (complications)":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:12, normalDelivery:75000, cSection:100000 },
    daycare:true, restoration:true, ncb:"10% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Premium plan","No sublimits","Shorter PED wait","Strong maternity"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Liver","Thyroid","Surgery / hospitalization"]
  },
  {
    id:"sbi-003", insurer:"SBI Health Insurance", product:"Arogya Plus",
    tpa:"Medi Assist", type:"Individual / Family Floater",
    sumInsured:[1,2,3,4,5], premium_indicative:"₹3,500+/yr",
    networkHospitals:6000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":24,"Sinusitis":24,"Knee replacement":48,"Hip replacement":48,"Gall bladder stones":24,"Kidney stones":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"fixed", limit:5000, icu:7500, note:"₹5000/day room — metro hospital risk" },
    subLimits:{ "Cataract (per eye)":20000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Entry level","SBI brand","Fixed room rent — KEY RISK in metro cities"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 3 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // MANIPAL CIGNA HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"manipalcigna-001", insurer:"ManipalCigna Health Insurance", product:"ProHealth Plus",
    tpa:"ManipalCigna (In-house)", type:"Individual / Family Floater",
    sumInsured:[2.5,4.5,7.5,10,15,20,25], premium_indicative:"₹7,500+/yr",
    networkHospitals:8500,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Fistula in ano":12,"Piles / Haemorrhoids":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Calculus diseases":12,"Gall bladder stones":12,"Kidney stones":12,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":40000 },
    maternity:{ covered:true, waitingPeriod:24, normalDelivery:25000, cSection:50000 },
    daycare:true, restoration:true, ncb:"10% per year up to 100%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["No room rent cap","Maternity included","Strong NCB"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Surgery last 5 yrs"]
  },
  {
    id:"manipalcigna-002", insurer:"ManipalCigna Health Insurance", product:"ProHealth Protect",
    tpa:"ManipalCigna (In-house)", type:"Individual / Family Floater",
    sumInsured:[2.5,3.5,5.5,6.5,7.5,10,15], premium_indicative:"₹5,500+/yr",
    networkHospitals:8500,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":48,"Hip replacement":48,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"percent_si", limit:1, icu:2, note:"1% of SI per day" },
    subLimits:{ "Cataract (per eye)":25000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Affordable","Room rent 1% SI — risk","Entry level"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },
  {
    id:"manipalcigna-003", insurer:"ManipalCigna Health Insurance", product:"Lifestyle Protection Critical Care",
    tpa:"ManipalCigna (In-house)", type:"Individual",
    sumInsured:[1,2,3,4,5,10,15,20,25], premium_indicative:"₹4,000+/yr",
    networkHospitals:8500,
    waitingPeriods:{ initial:90, ped:48,
      specificIllness:{ "Heart attack":90,"Stroke":90,"Cancer":90,"Kidney failure":90,"Bypass surgery":90,"Major organ transplant":90 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"lump_sum", limit:null, note:"Lump sum payout — no hospitalization required" },
    subLimits:{},
    maternity:{ covered:false, waitingPeriod:null },
    daycare:false, restoration:false, ncb:"5% per year up to 50%",
    reimbursementTimeline:"N/A — lump sum payout", cashlessPreAuth:"N/A — lump sum on diagnosis",
    highlights:["Lump sum on critical illness diagnosis","No hospitalization needed for payout","20 critical illnesses covered"],
    exclusions_specific:["Pre-existing critical illness","HIV-related cancer","Self-inflicted","War","Congenital"],
    disclosureRequired:["All critical illness history","All chronic conditions","All hospitalizations"]
  },

  // ═══════════════════════════════════════════════════════════
  // ORIENTAL INSURANCE (PSU)
  // ═══════════════════════════════════════════════════════════
  {
    id:"oriental-001", insurer:"Oriental Insurance", product:"Happy Family Floater",
    tpa:"Medi Assist / Oriental TPA", type:"Family Floater",
    sumInsured:[1,2,3,4,5,6,7,8,9,10,12,15,20], premium_indicative:"₹5,800+/yr",
    networkHospitals:6000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Fistula in ano":24,"Piles / Haemorrhoids":24,"Sinusitis":24,"Tonsillitis":24,"Adenoids":24,"Knee replacement":48,"Hip replacement":48,"Varicose veins":24,"Fibroid uterus":24,"Calculus diseases":24,"Gall bladder stones":24,"Kidney / ureteric stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":48,"Prolapsed disc":24 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"fixed", limit:5000, icu:10000, note:"₹5000/day room; ₹10000/day ICU — MAJOR RISK in metros" },
    subLimits:{ "Cataract (per eye)":20000, "Internal prosthesis":50000 },
    maternity:{ covered:true, waitingPeriod:24, normalDelivery:15000, cSection:25000 },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30-45 days", cashlessPreAuth:"48 hrs prior — PSU process, slower",
    highlights:["PSU insurer — government backed","Fixed room rent ₹5000/day — CRITICAL RISK for metro hospitals","PSU settlement slower"],
    exclusions_specific:["Cosmetic","Dental (non-accident)","Obesity","Experimental","HIV","War","Self-harm","IVF"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Surgery last 5 yrs"]
  },
  {
    id:"oriental-002", insurer:"Oriental Insurance", product:"Individual Mediclaim",
    tpa:"Medi Assist / Oriental TPA", type:"Individual",
    sumInsured:[1,2,3,4,5,6,7,8,9,10], premium_indicative:"₹4,500+/yr",
    networkHospitals:6000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":48,"Hip replacement":48,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"percent_si", limit:1, icu:2, note:"1% of SI per day — RISK" },
    subLimits:{ "Cataract (per eye)":15000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30-45 days", cashlessPreAuth:"48 hrs prior",
    highlights:["PSU insurer","Basic individual cover","Room rent 1% SI — risk","Slow settlement"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // NEW INDIA ASSURANCE (PSU)
  // ═══════════════════════════════════════════════════════════
  {
    id:"newindia-001", insurer:"New India Assurance", product:"New India Floater Mediclaim",
    tpa:"Vipul Medcorp / New India TPA", type:"Individual / Family Floater",
    sumInsured:[2,3,5,8,10,15], premium_indicative:"₹5,200+/yr",
    networkHospitals:7500,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":12,"Hernia (all types)":24,"Hydrocele":24,"Fistula in ano":24,"Piles / Haemorrhoids":24,"Sinusitis":12,"Tonsillitis":12,"Adenoids":12,"Knee replacement":48,"Hip replacement":48,"Varicose veins":24,"Fibroid uterus":24,"Calculus diseases":24,"Gall bladder stones":24,"Kidney / ureteric stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"percent_si", limit:1, icu:2, note:"1% of SI per day — sub-limit risk" },
    subLimits:{ "Cataract (per eye)":20000 },
    maternity:{ covered:true, waitingPeriod:24, normalDelivery:15000, cSection:25000 },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30-45 days", cashlessPreAuth:"48 hrs — Vipul Medcorp TPA",
    highlights:["Government insurer","Cataract wait only 12 months","Room rent 1% SI — RISK","Settlement can be slow"],
    exclusions_specific:["Cosmetic","Dental","Obesity","HIV","War","Self-harm","IVF","Experimental","Genetic"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Surgery","Hospitalization last 3 yrs"]
  },
  {
    id:"newindia-002", insurer:"New India Assurance", product:"New India Asha Kiran (Women)",
    tpa:"Vipul Medcorp / New India TPA", type:"Individual (Women)",
    sumInsured:[1,2,3,5,10,15], premium_indicative:"₹4,500+/yr",
    networkHospitals:7500,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":12,"Hernia":24,"Fibroid uterus":12,"Endometriosis":12,"Polycystic ovarian disease":12,"Cervical cancer":36,"Breast cancer":36,"Piles":12,"Sinusitis":12,"Gall bladder stones":12,"Kidney stones":12 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"percent_si", limit:1, icu:2, note:"1% of SI per day" },
    subLimits:{ "Cataract (per eye)":15000, "Maternity":25000 },
    maternity:{ covered:true, waitingPeriod:24, normalDelivery:15000, cSection:20000 },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30-45 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Women-specific","Short PCOS/fibroid wait","Government insurer","Room rent risk"],
    exclusions_specific:["Cosmetic","Dental","Obesity","HIV","War","Self-harm","IVF","Experimental"],
    disclosureRequired:["Diabetes","Hypertension","Cancer history","Gynaecological conditions","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // UNITED INDIA INSURANCE (PSU)
  // ═══════════════════════════════════════════════════════════
  {
    id:"uii-001", insurer:"United India Insurance", product:"United Individual Health Insurance",
    tpa:"Medi Assist / United India TPA", type:"Individual",
    sumInsured:[1,2,3,4,5,6,7,8,9,10], premium_indicative:"₹4,500+/yr",
    networkHospitals:7000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Fistula in ano":24,"Piles / Haemorrhoids":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":48,"Hip replacement":48,"Varicose veins":24,"Fibroid uterus":24,"Calculus diseases":24,"Gall bladder stones":24,"Kidney / ureteric stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"percent_si", limit:1, icu:2, note:"1% of SI/day — room rent RISK" },
    subLimits:{ "Cataract (per eye)":15000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30-60 days", cashlessPreAuth:"3 days prior — document heavy",
    highlights:["Lowest premium","PSU backed","Room rent 1% SI — RISK","Slow settlement","Limited network"],
    exclusions_specific:["Cosmetic","Dental","Obesity","HIV","War","Self-harm","IVF","Experimental"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery","Hospitalization last 3 yrs"]
  },
  {
    id:"uii-002", insurer:"United India Insurance", product:"United Family Medicare",
    tpa:"Medi Assist / United India TPA", type:"Family Floater",
    sumInsured:[3,5,10,15,20], premium_indicative:"₹6,000+/yr",
    networkHospitals:7000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":48,"Hip replacement":48,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"percent_si", limit:1, icu:2, note:"1% of SI per day" },
    subLimits:{ "Cataract (per eye)":15000 },
    maternity:{ covered:true, waitingPeriod:36, normalDelivery:10000, cSection:15000 },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30-60 days", cashlessPreAuth:"3 days prior",
    highlights:["PSU family floater","Government backed","Room rent risk","Slow settlement"],
    exclusions_specific:["Cosmetic","Dental","Obesity","HIV","War","Self-harm","IVF","Experimental"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // NATIONAL INSURANCE (PSU)
  // ═══════════════════════════════════════════════════════════
  {
    id:"national-001", insurer:"National Insurance", product:"National Mediclaim Plus",
    tpa:"Vipul Medcorp / National TPA", type:"Individual / Family",
    sumInsured:[1,2,3,5,10,15,20], premium_indicative:"₹4,800+/yr",
    networkHospitals:6500,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Piles / Haemorrhoids":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":48,"Hip replacement":48,"Varicose veins":24,"Fibroid uterus":24,"Calculus diseases":24,"Gall bladder stones":24,"Kidney stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"percent_si", limit:1, icu:2, note:"1% of SI per day" },
    subLimits:{ "Cataract (per eye)":15000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30-60 days", cashlessPreAuth:"48 hrs prior",
    highlights:["PSU insurer","Government backed","Room rent 1% SI — RISK","Slow TPA settlement"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","War","Self-harm","IVF"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },
  {
    id:"national-002", insurer:"National Insurance", product:"National Parivar Mediclaim Plus",
    tpa:"Vipul Medcorp / National TPA", type:"Family Floater",
    sumInsured:[2,3,5,10,15,20], premium_indicative:"₹5,800+/yr",
    networkHospitals:6500,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":24,"Sinusitis":24,"Knee replacement":48,"Hip replacement":48,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"fixed", limit:5000, icu:10000, note:"₹5000/day — RISK in metros" },
    subLimits:{ "Cataract (per eye)":15000 },
    maternity:{ covered:true, waitingPeriod:36, normalDelivery:10000, cSection:15000 },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30-60 days", cashlessPreAuth:"48 hrs prior",
    highlights:["PSU family floater","Fixed room rent — RISK","Slow settlement"],
    exclusions_specific:["Cosmetic","Dental","Obesity","HIV","War","Self-harm","IVF","Experimental"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // ROYAL SUNDARAM HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"royalsundaram-001", insurer:"Royal Sundaram", product:"Lifeline Supreme",
    tpa:"Royal Sundaram (In-house)", type:"Individual / Family Floater",
    sumInsured:[4,5,7,10,15,20,25,50,100], premium_indicative:"₹8,000+/yr",
    networkHospitals:7000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Fistula in ano":12,"Piles / Haemorrhoids":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Calculus diseases":12,"Gall bladder stones":12,"Kidney stones":12,"Polycystic ovarian disease":12,"Benign prostatic hypertrophy":24,"Diabetes (complications)":36,"Hypertension (complications)":36,"Psychiatric illness":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:36, normalDelivery:30000, cSection:50000 },
    daycare:true, restoration:true, ncb:"10% per year up to 100%",
    reimbursementTimeline:"15 days", cashlessPreAuth:"48 hrs prior",
    highlights:["No sublimits","36-month PED wait","No room rent cap","15-day settlement"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Liver","Thyroid","Surgery / hospitalization"]
  },
  {
    id:"royalsundaram-002", insurer:"Royal Sundaram", product:"Lifeline Classic",
    tpa:"Royal Sundaram (In-house)", type:"Individual / Family Floater",
    sumInsured:[3,4,5,7,10,15,20], premium_indicative:"₹6,500+/yr",
    networkHospitals:7000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":12,"Kidney stones":12,"Polycystic ovarian disease":12,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":35000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"10% per year up to 50%",
    reimbursementTimeline:"15 days", cashlessPreAuth:"48 hrs prior",
    highlights:["No room rent cap","Fast settlement","Good value"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // IFFCO TOKIO HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"iffco-001", insurer:"IFFCO Tokio", product:"Individual Medishield",
    tpa:"IFFCO Tokio TPA / Medi Assist", type:"Individual / Family",
    sumInsured:[1,2,3,4,5,7,10,15,20], premium_indicative:"₹5,200+/yr",
    networkHospitals:5000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Piles / Haemorrhoids":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":48,"Hip replacement":48,"Varicose veins":24,"Fibroid uterus":24,"Calculus diseases":24,"Gall bladder stones":24,"Kidney stones":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"percent_si", limit:1, icu:2, note:"1% of SI per day" },
    subLimits:{ "Cataract (per eye)":20000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Entry-level pricing","Room rent 1% SI — risk","Limited network"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },
  {
    id:"iffco-002", insurer:"IFFCO Tokio", product:"Family Health Protector",
    tpa:"IFFCO Tokio TPA / Medi Assist", type:"Family Floater",
    sumInsured:[2,3,4,5,7,10,15,20], premium_indicative:"₹6,500+/yr",
    networkHospitals:5000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":48,"Hip replacement":48,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"percent_si", limit:1, icu:2, note:"1% of SI per day" },
    subLimits:{ "Cataract (per eye)":20000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Family floater","Room rent 1% SI — risk","Limited network"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // CHOLAMANDALAM MS HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"chola-001", insurer:"Cholamandalam MS", product:"Flexi Health",
    tpa:"Medi Assist / Chola TPA", type:"Individual / Family Floater",
    sumInsured:[3,4,5,7.5,10,15,20,25,50], premium_indicative:"₹7,000+/yr",
    networkHospitals:8000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Piles / Haemorrhoids":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Calculus diseases":12,"Gall bladder stones":12,"Kidney stones":12,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":30000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"10% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["No room rent cap","Good value","Modular benefit add-ons"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // LIBERTY HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"liberty-001", insurer:"Liberty General Insurance", product:"Health Connect Supra",
    tpa:"Liberty TPA / Medi Assist", type:"Super Top-Up",
    sumInsured:[5,10,15,20,25,30,50,100], premium_indicative:"₹3,000+/yr",
    networkHospitals:6000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia":24,"Knee replacement":24,"Hip replacement":24,"Gall bladder stones":24,"Kidney stones":24,"Diabetes (complications)":36,"Hypertension (complications)":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Super top-up — good to pair with corporate cover","No sublimits","Affordable"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // DIGIT HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"digit-001", insurer:"Go Digit General Insurance", product:"Health Insurance",
    tpa:"Digit (In-house)", type:"Individual / Family Floater",
    sumInsured:[2,3,5,10,15,20,25,50,100], premium_indicative:"₹6,500+/yr",
    networkHospitals:6400,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Piles / Haemorrhoids":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Calculus diseases":24,"Gall bladder stones":24,"Kidney stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":40000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:true, ncb:"10% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"Digit app — digital pre-auth",
    highlights:["Digital-first experience","No room rent cap","Digital pre-auth","Growing network"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // ACKO HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"acko-001", insurer:"Acko General Insurance", product:"Acko Health Insurance",
    tpa:"Acko (In-house)", type:"Individual / Family Floater",
    sumInsured:[5,10,15,20,25,50,100], premium_indicative:"₹7,000+/yr",
    networkHospitals:7000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Piles / Haemorrhoids":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":12,"Kidney stones":12,"Polycystic ovarian disease":12,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:12, normalDelivery:50000, cSection:75000 },
    daycare:true, restoration:true, ncb:"10% per year up to 50%",
    reimbursementTimeline:"15 days", cashlessPreAuth:"Acko app — instant pre-auth",
    highlights:["Fully digital","Instant pre-auth via app","No sublimits","Fast settlement"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // FUTURE GENERALI HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"futuregenerali-001", insurer:"Future Generali India Insurance", product:"Health Total",
    tpa:"Medi Assist / Future Generali TPA", type:"Individual / Family Floater",
    sumInsured:[3,5,7.5,10,15,20,25], premium_indicative:"₹6,800+/yr",
    networkHospitals:6300,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Piles / Haemorrhoids":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":12,"Kidney stones":12,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":35000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:true, ncb:"10% per year up to 100%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["No room rent cap","Strong NCB","Restoration benefit"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // KOTAK MAHINDRA HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"kotak-001", insurer:"Kotak Mahindra General Insurance", product:"Health Shield",
    tpa:"Medi Assist / Kotak TPA", type:"Individual / Family Floater",
    sumInsured:[3,5,10,15,20,25,50,100], premium_indicative:"₹7,500+/yr",
    networkHospitals:7000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Piles / Haemorrhoids":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":40000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:true, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Kotak brand backing","No room rent cap","Restoration included"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // EDELWEISS HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"edelweiss-001", insurer:"Edelweiss General Insurance", product:"Health Apex",
    tpa:"Medi Assist / Edelweiss TPA", type:"Individual / Family Floater",
    sumInsured:[3,5,7.5,10,15,20,25,50,100], premium_indicative:"₹7,800+/yr",
    networkHospitals:7000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Piles / Haemorrhoids":12,"Sinusitis":12,"Tonsillitis":12,"Knee replacement":24,"Hip replacement":24,"Varicose veins":12,"Fibroid uterus":24,"Gall bladder stones":12,"Kidney stones":12,"Polycystic ovarian disease":12,"Benign prostatic hypertrophy":12,"Diabetes (complications)":36,"Hypertension (complications)":36,"Psychiatric illness":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:24, normalDelivery:50000, cSection:75000 },
    daycare:true, restoration:true, ncb:"10% per year up to 100%",
    reimbursementTimeline:"21 days", cashlessPreAuth:"48 hrs prior",
    highlights:["36-month PED wait","No sublimits","Maternity included","Short specific illness waits"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Liver","Thyroid","Surgery / hospitalization"]
  },

  // ═══════════════════════════════════════════════════════════
  // MAGMA HDI HEALTH INSURANCE
  // ═══════════════════════════════════════════════════════════
  {
    id:"magma-001", insurer:"Magma HDI General Insurance", product:"One Health",
    tpa:"Medi Assist / Magma TPA", type:"Individual / Family Floater",
    sumInsured:[3,5,10,15,20,25,50], premium_indicative:"₹6,800+/yr",
    networkHospitals:6000,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Piles / Haemorrhoids":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":35000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"48 hrs prior",
    highlights:["No room rent cap","Flexible plan","Growing network"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // STANDARD AROGYA CARE (UNIVERSAL HEALTH COVERAGE)
  // ═══════════════════════════════════════════════════════════
  {
    id:"arogya-sanjeevani-001", insurer:"All Insurers (IRDA Mandate)", product:"Arogya Sanjeevani Policy",
    tpa:"Respective Insurer TPA", type:"Individual / Family Floater (Standard)",
    sumInsured:[1,1.5,2,2.5,3,3.5,4,4.5,5], premium_indicative:"₹3,500+/yr",
    networkHospitals: 0,
    waitingPeriods:{ initial:30, ped:48,
      specificIllness:{ "Cataract":24,"Hernia (all types)":24,"Hydrocele":24,"Fistula in ano":24,"Piles / Haemorrhoids":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Calculus diseases":24,"Gall bladder stones":24,"Kidney stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":48,"Hypertension (complications)":48,"Psychiatric illness":48 }
    },
    copay:{ applicable:true, percent:5, ped_copay:5 },
    deductible:0, roomRent:{ type:"percent_si", limit:2, icu:5, note:"2% of SI/day room (max ₹5000); 5% ICU" },
    subLimits:{ "Cataract (per eye)":40000, "Modern treatment":50000 },
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"Varies by insurer",
    highlights:["IRDA-mandated standard product","Available from all general + standalone health insurers","5% copay on all claims","Comparable features across insurers","Max SI ₹5 lakh"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // HDFC ERGO / APOLLO MUNICH LEGACY
  // ═══════════════════════════════════════════════════════════
  {
    id:"hdfc-apollo-001", insurer:"HDFC Ergo (formerly Apollo Munich)", product:"Energy (Diabetes / Hypertension plan)",
    tpa:"HDFC Ergo (In-house)", type:"Individual (Diabetic / Hypertensive)",
    sumInsured:[2,3,5,10,15,20], premium_indicative:"₹12,000+/yr",
    networkHospitals:13000,
    waitingPeriods:{ initial:30, ped:0,
      specificIllness:{ "Diabetes complications":0,"Hypertension complications":0,"Cataract":24,"Hernia":24,"Knee replacement":24,"Hip replacement":24 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"72 hrs prior",
    highlights:["Covers diabetics / hypertensives from day 1","No PED wait for diabetes / BP","OPD benefit","Annual HbA1c / BP monitoring"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Full diabetes / hypertension history mandatory","Duration of condition","Current HbA1c / BP readings","All medications","All complications"]
  },
  {
    id:"hdfc-apollo-002", insurer:"HDFC Ergo (formerly Apollo Munich)", product:"Maxima",
    tpa:"HDFC Ergo (In-house)", type:"Individual / Family Floater",
    sumInsured:[3,5,10,15,20,25,50], premium_indicative:"₹8,500+/yr",
    networkHospitals:13000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia":24,"Piles":24,"Sinusitis":24,"Tonsillitis":24,"Knee replacement":24,"Hip replacement":24,"Varicose veins":24,"Fibroid uterus":24,"Gall bladder stones":24,"Kidney stones":24,"Polycystic ovarian disease":24,"Benign prostatic hypertrophy":24,"Diabetes (complications)":36,"Hypertension (complications)":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{ "Cataract (per eye)":60000 },
    maternity:{ covered:true, waitingPeriod:24, normalDelivery:40000, cSection:60000 },
    daycare:true, restoration:true, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"72 hrs prior",
    highlights:["Apollo Munich heritage","Maternity included","No room rent cap","Strong network"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Thyroid","Surgery / hospitalization"]
  },

  // ═══════════════════════════════════════════════════════════
  // SUPER TOP-UP PRODUCTS (MAJOR ONES)
  // ═══════════════════════════════════════════════════════════
  {
    id:"star-supertopup-001", insurer:"Star Health", product:"Star Super Surplus Insurance",
    tpa:"Star Health (In-house)", type:"Super Top-Up",
    sumInsured:[5,10,15,20,25,40,50], premium_indicative:"₹3,500+/yr",
    networkHospitals:14000,
    waitingPeriods:{ initial:30, ped:24,
      specificIllness:{ "Cataract":24,"Hernia":24,"Knee replacement":24,"Hip replacement":24,"Gall bladder stones":24,"Kidney stones":24,"Diabetes (complications)":24,"Hypertension (complications)":24 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"4 hrs prior",
    highlights:["Ideal to pair with corporate cover","Lower PED wait","Affordable","No sublimits"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },
  {
    id:"hdfc-supertopup-001", insurer:"HDFC Ergo", product:"Extra Care Plus (Super Top-Up)",
    tpa:"HDFC Ergo (In-house)", type:"Super Top-Up",
    sumInsured:[5,10,15,20,25,50,100], premium_indicative:"₹2,800+/yr",
    networkHospitals:13000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia":24,"Knee replacement":24,"Hip replacement":24,"Gall bladder stones":24,"Kidney stones":24,"Diabetes (complications)":36,"Hypertension (complications)":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 50%",
    reimbursementTimeline:"30 days", cashlessPreAuth:"72 hrs prior",
    highlights:["Good super top-up option","No sublimits","Affordable to layer on corporate cover"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },
  {
    id:"care-supertopup-001", insurer:"Care Health Insurance", product:"Care Super Top-Up",
    tpa:"Care Health (In-house)", type:"Super Top-Up",
    sumInsured:[10,15,20,30,40,50,100], premium_indicative:"₹2,500+/yr",
    networkHospitals:19000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":12,"Hernia":12,"Knee replacement":24,"Hip replacement":24,"Gall bladder stones":12,"Kidney stones":12,"Diabetes (complications)":36,"Hypertension (complications)":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"10% per year up to 50%",
    reimbursementTimeline:"21 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Largest network for a super top-up","Short specific illness waits","Affordable layering"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },
  {
    id:"nivabupa-supertopup-001", insurer:"Niva Bupa", product:"Health Recharge (Super Top-Up)",
    tpa:"Niva Bupa (In-house)", type:"Super Top-Up",
    sumInsured:[5,10,15,20,25,50], premium_indicative:"₹3,000+/yr",
    networkHospitals:10000,
    waitingPeriods:{ initial:30, ped:36,
      specificIllness:{ "Cataract":24,"Hernia":24,"Knee replacement":24,"Hip replacement":24,"Gall bladder stones":12,"Kidney stones":12,"Diabetes (complications)":36,"Hypertension (complications)":36 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No room rent sub-limit" },
    subLimits:{},
    maternity:{ covered:false, waitingPeriod:null },
    daycare:true, restoration:false, ncb:"5% per year up to 25%",
    reimbursementTimeline:"15 days", cashlessPreAuth:"48 hrs prior",
    highlights:["Fast 15-day settlement","No sublimits","Short PED wait for super top-up"],
    exclusions_specific:["Cosmetic","Dental","Obesity","Experimental","HIV","IVF","Self-inflicted","War"],
    disclosureRequired:["Diabetes","Hypertension","Heart","Cancer","Kidney","Surgery last 5 yrs"]
  },

  // ═══════════════════════════════════════════════════════════
  // GROUP / CORPORATE REFERENCE PRODUCTS
  // ═══════════════════════════════════════════════════════════
  {
    id:"star-group-001", insurer:"Star Health", product:"Star Group Health Insurance",
    tpa:"Star Health (In-house)", type:"Group / Corporate",
    sumInsured:[1,2,3,5,10,15,20,25,50], premium_indicative:"Varies by group size",
    networkHospitals:14000,
    waitingPeriods:{ initial:0, ped:0,
      specificIllness:{ "Cataract":0,"Hernia":0,"Knee replacement":0,"Diabetes complications":0,"Hypertension complications":0 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"Usually no cap — employer may customize" },
    subLimits:{},
    maternity:{ covered:true, waitingPeriod:0, normalDelivery:50000, cSection:75000 },
    daycare:true, restoration:false, ncb:"Not applicable",
    reimbursementTimeline:"15-30 days", cashlessPreAuth:"Pre-auth 4 hrs or immediate",
    highlights:["NO waiting periods","NO PED exclusions","All conditions covered from day 1","Leaves on resignation / retirement — convert to individual WITHIN 30 DAYS"],
    exclusions_specific:["Cosmetic","Dental (optional)","Self-inflicted","War"],
    disclosureRequired:["None — group cover requires no individual declaration","Note: converting to individual at policy end requires fresh declaration"]
  },

  // ═══════════════════════════════════════════════════════════
  // PMJAY / AYUSHMAN BHARAT (REFERENCE)
  // ═══════════════════════════════════════════════════════════
  {
    id:"pmjay-001", insurer:"Government of India / NHA", product:"Pradhan Mantri Jan Arogya Yojana (PMJAY / Ayushman Bharat)",
    tpa:"National Health Authority (NHA)", type:"Government Scheme (BPL / eligible families)",
    sumInsured:[5], premium_indicative:"₹0 (government funded)",
    networkHospitals:25000,
    waitingPeriods:{ initial:0, ped:0,
      specificIllness:{ "All conditions":0 }
    },
    copay:{ applicable:false, percent:0, ped_copay:0 },
    deductible:0, roomRent:{ type:"any", limit:null, icu:null, note:"No cap — secondary / tertiary care covered" },
    subLimits:{ "Dental (limited)":5000 },
    maternity:{ covered:true, waitingPeriod:0, normalDelivery:9000, cSection:9000 },
    daycare:true, restoration:false, ncb:"Not applicable",
    reimbursementTimeline:"Government process", cashlessPreAuth:"Empanelled hospital — e-card based",
    highlights:["₹5 lakh cover per family per year — FREE","No waiting periods","No PED exclusions","1578+ treatment packages","PMJAY card required","Eligible: BPL families and SECC 2011 database"],
    exclusions_specific:["OPD","Cosmetic","Self-inflicted","Fertility / IVF","Experimental","Drug abuse"],
    disclosureRequired:["PMJAY / Ayushman card required","No medical declaration needed"]
  },
];


const IRDA_EXCLUSIONS = [
  {code:"E01",name:"Pre-existing diseases",desc:"Conditions existing before policy inception — covered after waiting period (1–4 years depending on policy)"},
  {code:"E02",name:"Initial 30-day waiting period",desc:"No claim in the first 30 days except for accidents"},
  {code:"E03",name:"Specified illness waiting period",desc:"Named diseases like cataracts, hernias, joint replacements have 1–4 year waiting periods"},
  {code:"E04",name:"Maternity (unless rider added)",desc:"Normal delivery, C-section, and related complications — excluded unless maternity benefit is part of policy"},
  {code:"E05",name:"Cosmetic / aesthetic treatment",desc:"Rhinoplasty, liposuction, hair transplant excluded regardless of medical advice"},
  {code:"E06",name:"Dental treatment",desc:"Routine dental excluded. Dental injuries from accidents are covered."},
  {code:"E07",name:"Spectacles / hearing aids",desc:"External assistive devices excluded"},
  {code:"E08",name:"Substance abuse",desc:"Treatment related to alcohol, drugs, or substance abuse"},
  {code:"E09",name:"Self-inflicted injury",desc:"Intentional self-harm or attempted suicide"},
  {code:"E10",name:"War / nuclear perils",desc:"War, invasion, riot, nuclear/chemical/biological incidents"},
  {code:"E11",name:"Experimental treatment",desc:"Treatments not recognized by Indian Medical Council"},
  {code:"E12",name:"Obesity / weight management",desc:"Bariatric surgery excluded unless BMI >40 with life-threatening comorbidities"},
  {code:"E13",name:"Infertility / IVF",desc:"Treatment for infertility, IVF, IUI, surrogacy — excluded in most standard policies"},
  {code:"E14",name:"Congenital anomalies (external visible)",desc:"Birth defects visible at birth. Internal congenital may be covered after waiting period."},
  {code:"E15",name:"HIV / AIDS",desc:"Many policies exclude or heavily limit HIV/AIDS treatment"},
  {code:"E16",name:"Vitamins / tonics",desc:"Routine supplements and tonics prescribed as general health maintenance"},
];

const DISCLOSURE_QUESTIONS = [
  {id:"q1",cat:"Metabolic",condition:"Diabetes / high blood sugar (including pre-diabetes)",ped:true,pedRisk:"high",note:"Even pre-diabetes or impaired fasting glucose. BP/sugar medication is a clear signal."},
  {id:"q2",cat:"Cardiovascular",condition:"High blood pressure / hypertension",ped:true,pedRisk:"high",note:"Treated or untreated — any BP medication must be declared."},
  {id:"q3",cat:"Cardiovascular",condition:"Heart disease / angina / heart attack / bypass / stent",ped:true,pedRisk:"high",note:"Any cardiac procedure, stent, angioplasty, or bypass must be declared."},
  {id:"q4",cat:"Metabolic",condition:"Thyroid disorder (hypo / hyperthyroid)",ped:true,pedRisk:"medium",note:"If on thyroid medication — must declare."},
  {id:"q5",cat:"Respiratory",condition:"Asthma / COPD / chronic bronchitis",ped:true,pedRisk:"high",note:"Even seasonal asthma needing inhalers must be declared."},
  {id:"q6",cat:"Oncology",condition:"Cancer (any type, including past history in remission)",ped:true,pedRisk:"high",note:"Even treated and in remission — full cancer history must be disclosed."},
  {id:"q7",cat:"Renal",condition:"Kidney disease / chronic kidney disease / dialysis",ped:true,pedRisk:"high",note:"CKD, dialysis, recurrent kidney stones must be declared."},
  {id:"q8",cat:"Hepatic",condition:"Liver disease / fatty liver / hepatitis B or C",ped:true,pedRisk:"high",note:"Hepatitis B/C carrier status, fatty liver, cirrhosis must be declared."},
  {id:"q9",cat:"Musculoskeletal",condition:"Arthritis / joint disorders / spondylitis",ped:true,pedRisk:"medium",note:"Rheumatoid arthritis is particularly important to disclose."},
  {id:"q10",cat:"Neurological",condition:"Epilepsy / seizures / stroke / neurological disorders",ped:true,pedRisk:"high",note:"Any seizure history, epilepsy, MS, Parkinson's, stroke must be declared."},
  {id:"q11",cat:"Psychiatric",condition:"Depression / anxiety / psychiatric condition (on medication)",ped:true,pedRisk:"medium",note:"Mental health conditions if treated with medication must be declared."},
  {id:"q12",cat:"Ophthalmic",condition:"Cataract / glaucoma / retinal conditions (diagnosed)",ped:true,pedRisk:"medium",note:"Diagnosed cataract must be declared — major non-disclosure risk."},
  {id:"q13",cat:"Gastrointestinal",condition:"Gall bladder stones / kidney stones (diagnosed)",ped:true,pedRisk:"medium",note:"Diagnosed stones even if asymptomatic at policy inception must be declared."},
  {id:"q14",cat:"Reproductive",condition:"Polycystic ovarian syndrome / PCOS / PCOD",ped:true,pedRisk:"medium",note:"Common in women — must be declared if diagnosed."},
  {id:"q15",cat:"Surgical",condition:"Any surgery in the last 5 years",ped:false,pedRisk:"high",note:"All surgeries — major or minor — appendix, hernia, C-section, tonsil, etc."},
  {id:"q16",cat:"Hospitalization",condition:"Any hospitalization in the last 3 years",ped:false,pedRisk:"medium",note:"Any admission for investigation or treatment must be declared."},
  {id:"q17",cat:"Lifestyle",condition:"Tobacco use (smoking / chewing tobacco regularly)",ped:false,pedRisk:"medium",note:"Smokers must declare — affects underwriting and cancer risk."},
  {id:"q18",cat:"Lifestyle",condition:"Regular alcohol consumption",ped:false,pedRisk:"medium",note:"Regular consumption must be declared. Heavy use is a high-risk flag."},
  {id:"q19",cat:"Metabolic",condition:"Obesity (BMI > 30)",ped:false,pedRisk:"medium",note:"BMI over 30 increases risk of multiple conditions — should be declared."},
  {id:"q20",cat:"Chronic",condition:"Any chronic condition requiring medication for 90+ days",ped:true,pedRisk:"high",note:"If you take any medicine regularly — declare the underlying condition."},
];

const TPA_DATA = [
  {name:"Star Health TPA",insurer:"Star Health",hotline:"1800-425-2255",network:14000,portal:"starhealth.in"},
  {name:"Niva Bupa TPA",insurer:"Niva Bupa",hotline:"1800-3010-3333",network:10000,portal:"nivabupa.com"},
  {name:"HDFC Ergo TPA",insurer:"HDFC Ergo",hotline:"1800-2700-700",network:13000,portal:"hdfcergo.com"},
  {name:"Care Health TPA",insurer:"Care Health",hotline:"1800-102-4488",network:19000,portal:"careinsurance.com"},
  {name:"ICICI Lombard TPA",insurer:"ICICI Lombard",hotline:"1800-2666",network:10000,portal:"icicilombard.com"},
  {name:"Bajaj Allianz TPA",insurer:"Bajaj Allianz",hotline:"1800-209-5858",network:8000,portal:"bajajallianz.com"},
  {name:"Medi Assist",insurer:"PSU Insurers",hotline:"1800-425-9449",network:12000,portal:"mediassist.in"},
  {name:"Vipul Medcorp TPA",insurer:"New India Assurance",hotline:"1800-419-9900",network:8000,portal:"vipulmedcorp.com"},
  {name:"Aditya Birla Health TPA",insurer:"Aditya Birla",hotline:"1800-270-7000",network:11000,portal:"adityabirlahealthinsurance.com"},
  {name:"Reliance Health TPA",insurer:"Reliance Health",hotline:"1800-102-4488",network:8500,portal:"reliancehealth.in"},
];

const CONDITION_MAP = {
  "cataract":["Cataract"],"hernia":["Hernia"],"knee":["Knee replacement"],"hip":["Hip replacement"],
  "varicose":["Varicose veins"],"piles":["Piles / Fissures"],"fissure":["Piles / Fissures"],
  "sinus":["Sinusitis"],"tonsil":["Tonsillitis"],"fibroid":["Fibroid uterus"],
  "gall":["Gall bladder stones"],"gallbladder":["Gall bladder stones"],"gallstone":["Gall bladder stones"],
  "kidney stone":["Kidney stones"],"calculus":["Gall bladder stones","Kidney stones"],
  "diabetes":["Diabetes complications"],"diabetic":["Diabetes complications"],
  "hypertension":["Hypertension complications"],"blood pressure":["Hypertension complications"],
  "psychiatric":["Psychiatric illness"],"depression":["Psychiatric illness"],"anxiety":["Psychiatric illness"],
  "prostate":["Benign prostatic hypertrophy"],"bph":["Benign prostatic hypertrophy"],
  "pcos":["Polycystic ovarian disease"],"pcod":["Polycystic ovarian disease"],"polycystic":["Polycystic ovarian disease"],
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  background: #f7f5f0;
  color: #1a1a1a;
  min-height: 100vh;
}

.app-shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  flex-shrink: 0;
  background: #1a1a1a;
  padding: 28px 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-logo {
  padding: 0 20px 28px;
  border-bottom: 1px solid #333;
}
.sidebar-logo h1 {
  font-family: 'DM Serif Display', serif;
  font-size: 18px;
  color: #fff;
  line-height: 1.2;
}
.sidebar-logo p {
  font-size: 10px;
  color: #888;
  margin-top: 3px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sidebar-nav {
  padding: 20px 0;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  cursor: pointer;
  color: #888;
  font-size: 13px;
  transition: all 0.15s;
  border-left: 2px solid transparent;
}
.nav-item:hover { color: #ccc; background: rgba(255,255,255,0.04); }
.nav-item.active { color: #fff; border-left-color: #c9a96e; background: rgba(201,169,110,0.08); }
.nav-icon { width: 16px; height: 16px; font-size: 14px; flex-shrink: 0; }

.main-content {
  flex: 1;
  padding: 32px 36px;
  max-width: 920px;
}

.page-header { margin-bottom: 28px; }
.page-header h2 {
  font-family: 'DM Serif Display', serif;
  font-size: 26px;
  color: #1a1a1a;
  font-weight: 400;
}
.page-header p { font-size: 13px; color: #666; margin-top: 6px; line-height: 1.6; }

.card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e8e3da;
  padding: 20px 24px;
  margin-bottom: 16px;
}

.card-title {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 14px;
}

.section-title {
  font-family: 'DM Serif Display', serif;
  font-size: 17px;
  color: #1a1a1a;
  font-weight: 400;
  margin-bottom: 4px;
}

input[type=text], input[type=search], select, textarea {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid #e0dbd0;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  background: #faf9f6;
  color: #1a1a1a;
  outline: none;
  transition: border-color 0.15s;
}
input:focus, select:focus, textarea:focus { border-color: #c9a96e; background: #fff; }

button {
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  border: none;
  outline: none;
}

.btn-primary {
  background: #1a1a1a;
  color: #fff;
  padding: 9px 20px;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.15s;
}
.btn-primary:hover { background: #333; }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

.btn-ghost {
  background: transparent;
  border: 1px solid #e0dbd0;
  color: #555;
  padding: 7px 16px;
  border-radius: 8px;
  transition: all 0.15s;
}
.btn-ghost:hover { border-color: #c9a96e; color: #1a1a1a; }

.badge {
  display: inline-block;
  padding: 2px 9px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
}
.badge-green { background: #e8f5ee; color: #2d7a4f; }
.badge-amber { background: #fef5e0; color: #8a6200; }
.badge-red { background: #fee8e8; color: #9a2020; }
.badge-gray { background: #f0ede8; color: #666; }
.badge-gold { background: #fdf3e0; color: #7a5800; }

.flag-bar { display: flex; gap: 8px; align-items: center; padding: 11px 14px; border-radius: 8px; margin-bottom: 8px; }
.flag-bar.danger { background: #fff1f1; border-left: 3px solid #c0392b; }
.flag-bar.warning { background: #fffbf0; border-left: 3px solid #d4ac0d; }
.flag-bar.ok { background: #f0f9f4; border-left: 3px solid #27ae60; }
.flag-bar.info { background: #f0f4ff; border-left: 3px solid #4a6cf7; }
.flag-label { font-size: 12px; font-weight: 500; color: #333; }
.flag-desc { font-size: 12px; color: #555; margin-top: 2px; line-height: 1.5; }

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }

.stat-box { background: #faf9f6; border-radius: 8px; padding: 14px 16px; border: 1px solid #ede9e0; }
.stat-label { font-size: 11px; color: #999; margin-bottom: 4px; }
.stat-val { font-size: 20px; font-weight: 500; color: #1a1a1a; }
.stat-sub { font-size: 11px; color: #888; margin-top: 3px; }

.policy-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid #f0ede8;
}
.policy-row:last-child { border-bottom: none; }
.policy-rank {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f0ede8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  color: #888;
  flex-shrink: 0;
  margin-top: 2px;
}
.policy-rank.top { background: #fdf3e0; color: #7a5800; }
.policy-name { font-weight: 500; font-size: 13px; }
.policy-insurer { font-size: 12px; color: #888; margin-top: 1px; }
.policy-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 7px; }
.policy-detail { font-size: 12px; color: #555; margin-top: 5px; line-height: 1.6; }

.pill { display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 500; border: 1px solid; }
.pill-green { background: #e8f5ee; color: #2d7a4f; border-color: #b8e0c8; }
.pill-red { background: #fee8e8; color: #9a2020; border-color: #f5bcbc; }
.pill-amber { background: #fef5e0; color: #8a6200; border-color: #f5e0a0; }
.pill-gray { background: #f0ede8; color: #666; border-color: #ddd; }

.check-row { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f5f3ef; }
.check-row:last-child { border-bottom: none; }
.check-circle { width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; margin-top: 1px; }
.check-circle.yes { background: #e8f5ee; color: #2d7a4f; }
.check-circle.no { background: #fee8e8; color: #9a2020; }
.check-circle.neutral { background: #f0ede8; color: #888; }
.check-label { font-size: 13px; font-weight: 500; }
.check-note { font-size: 12px; color: #777; margin-top: 2px; line-height: 1.5; }

.disclosure-q { padding: 14px 0; border-bottom: 1px solid #f0ede8; }
.disclosure-q:last-child { border-bottom: none; }
.dq-label { font-size: 13px; color: #222; font-weight: 400; line-height: 1.5; margin-bottom: 10px; }
.dq-options { display: flex; gap: 8px; }
.dq-btn { padding: 6px 16px; border-radius: 20px; font-size: 12px; border: 1px solid #e0dbd0; background: #faf9f6; color: #555; transition: all 0.12s; }
.dq-btn:hover { border-color: #c9a96e; }
.dq-btn.selected-yes { background: #fee8e8; border-color: #f5bcbc; color: #9a2020; font-weight: 500; }
.dq-btn.selected-no { background: #e8f5ee; border-color: #b8e0c8; color: #2d7a4f; font-weight: 500; }
.dq-note { font-size: 11px; color: #888; margin-top: 8px; padding: 7px 10px; background: #faf9f6; border-radius: 6px; line-height: 1.5; }
.dq-cat { font-size: 10px; letter-spacing: 0.07em; text-transform: uppercase; color: #bbb; margin-bottom: 5px; }

.tab-bar { display: flex; gap: 4px; margin-bottom: 20px; border-bottom: 1px solid #e8e3da; }
.tab { padding: 9px 16px; font-size: 13px; color: #888; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.12s; }
.tab:hover { color: #444; }
.tab.active { color: #1a1a1a; border-bottom-color: #c9a96e; font-weight: 500; }

.search-box { position: relative; margin-bottom: 16px; }
.search-box input { padding-left: 36px; }
.search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #aaa; }

.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
th { text-align: left; padding: 8px 12px; background: #f5f3ef; color: #888; font-weight: 500; font-size: 11px; letter-spacing: 0.04em; text-transform: uppercase; white-space: nowrap; }
td { padding: 10px 12px; border-bottom: 1px solid #f0ede8; vertical-align: top; color: #333; }
tr:last-child td { border-bottom: none; }
tr:hover td { background: #fdf9f4; }

.file-drop { border: 1.5px dashed #d5cfc4; border-radius: 10px; padding: 28px 20px; text-align: center; cursor: pointer; background: #faf9f6; transition: all 0.15s; position: relative; }
.file-drop:hover, .file-drop.over { border-color: #c9a96e; background: #fdf8ee; }
.file-drop input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
.file-drop-icon { font-size: 24px; margin-bottom: 8px; }
.file-drop-label { font-size: 13px; font-weight: 500; color: #444; }
.file-drop-sub { font-size: 11px; color: #aaa; margin-top: 4px; }
.file-attached { display: inline-flex; align-items: center; gap: 6px; margin-top: 8px; padding: 4px 10px; background: #e8f5ee; border-radius: 20px; font-size: 11px; color: #2d7a4f; font-weight: 500; }

.spinner { display: inline-block; width: 16px; height: 16px; border: 2px solid #e0dbd0; border-top-color: #c9a96e; border-radius: 50%; animation: spin 0.7s linear infinite; vertical-align: middle; margin-right: 8px; }
@keyframes spin { to { transform: rotate(360deg); } }

.verdict-block { border-radius: 10px; padding: 18px 20px; margin-top: 16px; }
.verdict-block.safe { background: #f0f9f4; border: 1px solid #b8e0c8; }
.verdict-block.risky { background: #fff1f1; border: 1px solid #f5bcbc; }
.verdict-block.caution { background: #fffbf0; border: 1px solid #f5e0a0; }
.verdict-title { font-weight: 500; font-size: 14px; margin-bottom: 6px; }
.verdict-text { font-size: 13px; line-height: 1.7; color: #444; }

.progress-bar { height: 6px; background: #f0ede8; border-radius: 3px; overflow: hidden; margin-top: 8px; }
.progress-fill { height: 100%; border-radius: 3px; transition: width 0.3s; }

.tpa-card { border: 1px solid #e8e3da; border-radius: 10px; padding: 16px; background: #fff; }
.tpa-name { font-weight: 500; font-size: 13px; }
.tpa-insurer { font-size: 12px; color: #888; margin-top: 2px; }
.tpa-hotline { font-size: 12px; color: #555; margin-top: 10px; }
.tpa-network { font-size: 12px; color: #555; }

.ai-loading { display: flex; align-items: center; gap: 10px; padding: 16px; color: #888; font-size: 13px; }
.dot-pulse { display: flex; gap: 4px; }
.dot-pulse span { width: 6px; height: 6px; border-radius: 50%; background: #c9a96e; animation: pulse 1.2s ease-in-out infinite; }
.dot-pulse span:nth-child(2) { animation-delay: 0.2s; }
.dot-pulse span:nth-child(3) { animation-delay: 0.4s; }
@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }

.highlight-pill { background: #c9a96e; color: #fff; border-radius: 20px; padding: 2px 10px; font-size: 11px; font-weight: 500; }

.summary-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 20px; }
@media (max-width: 700px) { .summary-grid { grid-template-columns: 1fr 1fr; } .grid-2 { grid-template-columns: 1fr; } }
`;

// ─── Helper functions ─────────────────────────────────────────────────────────

function getWaitingMonths(policy, condition) {
  const key = condition.trim();
  return policy.waitingPeriods.specificIllness[key] ?? null;
}

function matchConditions(query) {
  const q = query.toLowerCase();
  const matched = new Set();
  for (const [k, v] of Object.entries(CONDITION_MAP)) {
    if (q.includes(k)) v.forEach(c => matched.add(c));
  }
  if (matched.size === 0) {
    // fuzzy: check all illness keys
    for (const p of FULL_POLICY_DB) {
      for (const k of Object.keys(p.waitingPeriods.specificIllness)) {
        if (q.includes(k.toLowerCase().split(" ")[0])) matched.add(k);
      }
    }
  }
  return [...matched];
}

function compareForCondition(conditions) {
  return FULL_POLICY_DB.map(p => {
    const waits = conditions.map(c => ({ condition: c, months: getWaitingMonths(p, c) }));
    const maxWait = Math.max(...waits.map(w => w.months ?? 48));
    const pedWait = p.waitingPeriods.ped;
    const score = (48 - maxWait) + (48 - pedWait) + (p.copay.applicable ? 0 : 10) + (p.roomRent.type === "any" ? 8 : 0) + (p.restoration ? 5 : 0);
    return { policy: p, waits, maxWait, score };
  }).sort((a, b) => b.score - a.score);
}

// ─── Modules ─────────────────────────────────────────────────────────────────

function Module_PolicyAnalyzer() {
  const [policyFile, setPolicyFile] = useState(null);
  const [rxFile, setRxFile] = useState(null);
  const [policyData, setPolicyData] = useState(null);
  const [rxData, setRxData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const readFile = (file, setter) => {
    const reader = new FileReader();
    reader.onload = e => setter(e.target.result.split(",")[1]);
    reader.readAsDataURL(file);
  };

  const handlePolicy = (f) => { setPolicyFile(f); readFile(f, setPolicyData); };
  const handleRx = (f) => { setRxFile(f); readFile(f, setRxData); };

  const getMedia = (f) => f?.type === "application/pdf" ? "application/pdf" : f?.type || "image/jpeg";

  const analyze = async () => {
    setLoading(true); setError(""); setResult(null);
    const sys = `You are an expert Indian health insurance policy analyst. Analyze the uploaded policy document and doctor's prescription together.

Return ONLY valid JSON with this exact structure:
{
  "diagnosis": "Extracted diagnosis from prescription",
  "treatmentPlan": "Brief treatment plan summary",
  "alerts": [{"type":"danger|warning|ok|info","title":"Short title","body":"Plain language. Specific months/amounts."}],
  "waitingPeriodCheck": {"hasWaiting":true|false,"months":0,"condition":"","note":""},
  "pedCheck": {"isPED":true|false|"unclear","note":""},
  "exclusionCheck": {"excluded":true|false,"exclusion":"","note":""},
  "roomRentRisk": {"hasRisk":true|false,"note":""},
  "copayCheck": {"hasCopay":true|false,"percent":0,"note":""},
  "subLimitCheck": {"hasSubLimit":true|false,"limit":0,"note":""},
  "cashlessChecklist": ["Step 1 action","Step 2 action"],
  "reimbursementChecklist": ["Step 1 action","Step 2 action"],
  "nonDisclosure": {"risk":"high|medium|low","conditions":["condition1"],"note":""},
  "overallVerdict": {"outlook":"favourable|caution|risky","summary":"2-3 sentences plain language"},
  "tags": ["tag1","tag2"]
}`;

    try {
      const content = [
        {type: getMedia(policyFile)==="application/pdf"?"document":"image", source:{type:"base64",media_type:getMedia(policyFile),data:policyData}},
        {type: getMedia(rxFile)==="application/pdf"?"document":"image", source:{type:"base64",media_type:getMedia(rxFile),data:rxData}},
        {type:"text",text:"Analyze the policy document and prescription. Return JSON only, no markdown."}
      ];
      const res = await fetch("/api/claude",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2000,system:sys,messages:[{role:"user",content}]})
      });
      const data = await res.json();
      if (!data || !data.content) throw new Error((data && data.error && data.error.message) || JSON.stringify(data) || "API error");
      const raw = data.content.map(b=>b.text||"").join("").replace(/```json|```/g,"").trim();
      setResult(JSON.parse(raw));
    } catch(e) { setError("Analysis failed: "+e.message); }
    setLoading(false);
  };

  return (
    <div>
      <div className="page-header">
        <h2>Policy Analyzer</h2>
        <p>Upload your policy document and doctor's prescription to get a detailed coverage assessment, claim risks, and non-disclosure check.</p>
      </div>

      <div className="card">
        <div className="card-title">Upload documents</div>
        <div className="grid-2" style={{gap:16,marginBottom:16}}>
          <div>
            <div style={{fontSize:12,fontWeight:500,color:"#666",marginBottom:8}}>Policy Document</div>
            <div className={`file-drop ${policyFile?"":"" }`} onDrop={e=>{e.preventDefault();handlePolicy(e.dataTransfer.files[0]);}} onDragOver={e=>e.preventDefault()}>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e=>e.target.files[0]&&handlePolicy(e.target.files[0])} />
              <div className="file-drop-icon">📋</div>
              <div className="file-drop-label">{policyFile?policyFile.name:"Drop PDF or image"}</div>
              <div className="file-drop-sub">Policy schedule, wordings document</div>
              {policyFile && <div className="file-attached">✓ Attached</div>}
            </div>
          </div>
          <div>
            <div style={{fontSize:12,fontWeight:500,color:"#666",marginBottom:8}}>Doctor's Prescription</div>
            <div className="file-drop" onDrop={e=>{e.preventDefault();handleRx(e.dataTransfer.files[0]);}} onDragOver={e=>e.preventDefault()}>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e=>e.target.files[0]&&handleRx(e.target.files[0])} />
              <div className="file-drop-icon">🩺</div>
              <div className="file-drop-label">{rxFile?rxFile.name:"Drop PDF or image"}</div>
              <div className="file-drop-sub">Diagnosis + treatment plan</div>
              {rxFile && <div className="file-attached">✓ Attached</div>}
            </div>
          </div>
        </div>
        <button className="btn-primary" disabled={!policyData||!rxData||loading} onClick={analyze}>
          {loading && <span className="spinner"/>}
          {loading ? "Analyzing documents…" : "Analyze coverage & claim risk ↗"}
        </button>
        {error && <div style={{marginTop:12,padding:"10px 14px",background:"#fff1f1",borderRadius:8,fontSize:13,color:"#9a2020"}}>{error}</div>}
      </div>

      {result && <AnalysisResult result={result} />}
    </div>
  );
}

function AnalysisResult({result}) {
  const r = result;
  const verdictClass = r.overallVerdict?.outlook === "favourable" ? "safe" : r.overallVerdict?.outlook === "risky" ? "risky" : "caution";
  return (
    <div>
      {r.diagnosis && (
        <div className="card">
          <div className="card-title">Extracted from documents</div>
          <div style={{display:"flex",gap:24}}>
            <div><div style={{fontSize:11,color:"#999",marginBottom:4}}>DIAGNOSIS</div><div style={{fontSize:14,fontWeight:500}}>{r.diagnosis}</div></div>
            {r.treatmentPlan && <div><div style={{fontSize:11,color:"#999",marginBottom:4}}>TREATMENT PLAN</div><div style={{fontSize:13,color:"#444"}}>{r.treatmentPlan}</div></div>}
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-title">Coverage flags</div>
        {(r.alerts||[]).map((a,i)=>(
          <div key={i} className={`flag-bar ${a.type}`}>
            <div style={{flex:1}}>
              <div className="flag-label">{a.title}</div>
              <div className="flag-desc">{a.body}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Key checks</div>
          {[
            r.waitingPeriodCheck && {
              ok: !r.waitingPeriodCheck.hasWaiting,
              label: r.waitingPeriodCheck.hasWaiting ? `Waiting period: ${r.waitingPeriodCheck.months} months` : "No waiting period applies",
              note: r.waitingPeriodCheck.note
            },
            r.pedCheck && {
              ok: !r.pedCheck.isPED,
              label: r.pedCheck.isPED === true ? "Pre-existing disease risk" : r.pedCheck.isPED === "unclear" ? "PED status unclear" : "No PED concern",
              note: r.pedCheck.note
            },
            r.exclusionCheck && {
              ok: !r.exclusionCheck.excluded,
              label: r.exclusionCheck.excluded ? `Exclusion: ${r.exclusionCheck.exclusion}` : "No exclusions triggered",
              note: r.exclusionCheck.note
            },
            r.copayCheck && {
              ok: !r.copayCheck.hasCopay,
              label: r.copayCheck.hasCopay ? `Copay applies: ${r.copayCheck.percent}%` : "No copay applies",
              note: r.copayCheck.note
            },
            r.roomRentRisk && {
              ok: !r.roomRentRisk.hasRisk,
              label: r.roomRentRisk.hasRisk ? "Room rent sub-limit risk" : "No room rent restriction",
              note: r.roomRentRisk.note
            },
            r.subLimitCheck && {
              ok: !r.subLimitCheck.hasSubLimit,
              label: r.subLimitCheck.hasSubLimit ? `Sub-limit: ₹${(r.subLimitCheck.limit||0).toLocaleString()}` : "No sub-limits apply",
              note: r.subLimitCheck.note
            },
          ].filter(Boolean).map((item,i)=>(
            <div key={i} className="check-row">
              <div className={`check-circle ${item.ok?"yes":"no"}`}>{item.ok?"✓":"!"}</div>
              <div>
                <div className="check-label">{item.label}</div>
                {item.note && <div className="check-note">{item.note}</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title">Non-disclosure assessment</div>
          <div className={`badge ${r.nonDisclosure?.risk==="high"?"badge-red":r.nonDisclosure?.risk==="medium"?"badge-amber":"badge-green"}`} style={{marginBottom:10}}>
            {r.nonDisclosure?.risk === "high" ? "High risk" : r.nonDisclosure?.risk === "medium" ? "Medium risk" : "Low risk"}
          </div>
          {(r.nonDisclosure?.conditions||[]).length > 0 && (
            <div style={{marginBottom:8}}>
              {r.nonDisclosure.conditions.map((c,i)=>(<span key={i} className="pill pill-amber" style={{margin:"2px"}}>{c}</span>))}
            </div>
          )}
          <div style={{fontSize:13,color:"#555",lineHeight:1.7}}>{r.nonDisclosure?.note}</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Cashless claim checklist</div>
          {(r.cashlessChecklist||[]).map((s,i)=>(
            <div key={i} className="check-row">
              <div className="check-circle neutral">{i+1}</div>
              <div className="check-label">{s}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title">Reimbursement checklist</div>
          {(r.reimbursementChecklist||[]).map((s,i)=>(
            <div key={i} className="check-row">
              <div className="check-circle neutral">{i+1}</div>
              <div className="check-label">{s}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Overall assessment</div>
        <div className={`verdict-block ${verdictClass}`}>
          <div className="verdict-title" style={{color: verdictClass==="safe"?"#2d7a4f":verdictClass==="risky"?"#9a2020":"#8a6200"}}>
            {verdictClass==="safe" ? "✓ Favourable" : verdictClass==="risky" ? "⚠ High risk" : "~ Exercise caution"}
          </div>
          <div className="verdict-text">{r.overallVerdict?.summary}</div>
        </div>
        <div style={{marginTop:12,display:"flex",flexWrap:"wrap",gap:6}}>
          {(r.tags||[]).map((t,i)=>(<span key={i} className="badge badge-gray">{t}</span>))}
        </div>
      </div>
    </div>
  );
}

function Module_PolicyComparison() {
  const [query, setQuery] = useState("");
  const [policyAge, setPolicyAge] = useState("");
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState("waiting");

  const search = () => {
    const conditions = matchConditions(query);
    if (conditions.length === 0 && query.trim()) {
      const custom = [query.trim()];
      setResults({ conditions: custom, ranked: compareForCondition(custom) });
    } else {
      const conds = conditions.length > 0 ? conditions : Object.keys(FULL_POLICY_DB[0].waitingPeriods.specificIllness).slice(0,3);
      setResults({ conditions: conds, ranked: compareForCondition(conds) });
    }
  };

  const COMMON = ["Cataract","Hernia","Knee replacement","Gall bladder stones","Kidney stones","Diabetes complications","Piles / Fissures","Polycystic ovarian disease"];

  return (
    <div>
      <div className="page-header">
        <h2>Policy Comparison</h2>
        <p>Search by diagnosis or condition to see which policies cover it today and which have active waiting periods. Based on our database of 12 major products.</p>
      </div>

      <div className="card">
        <div className="card-title">Search by condition / diagnosis</div>
        <div style={{display:"flex",gap:10,marginBottom:12}}>
          <input type="text" placeholder="e.g. cataract, hernia, knee replacement, diabetes…" value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()} style={{flex:1}} />
          <input type="text" placeholder="Policy age (months)" value={policyAge} onChange={e=>setPolicyAge(e.target.value)} style={{width:180}} />
          <button className="btn-primary" onClick={search}>Compare ↗</button>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {COMMON.map(c=>(
            <button key={c} className="btn-ghost" style={{padding:"4px 12px",fontSize:12}} onClick={()=>{setQuery(c);setResults({conditions:[c],ranked:compareForCondition([c])})}}>{c}</button>
          ))}
        </div>
      </div>

      {results && (
        <div>
          <div className="card" style={{marginBottom:16}}>
            <div className="card-title">Analyzing for: {results.conditions.join(", ")}</div>
            <div className="summary-grid">
              <div className="stat-box"><div className="stat-label">Policies analyzed</div><div className="stat-val">{FULL_POLICY_DB.length}</div></div>
              <div className="stat-box"><div className="stat-label">Cover immediately</div><div className="stat-val" style={{color:"#2d7a4f"}}>{results.ranked.filter(r=>r.maxWait===0||(policyAge&&parseInt(policyAge)>=(r.maxWait||0))).length}</div></div>
              <div className="stat-box"><div className="stat-label">Shortest wait</div><div className="stat-val">{Math.min(...results.ranked.map(r=>r.maxWait))} mo</div></div>
              <div className="stat-box"><div className="stat-label">Longest wait</div><div className="stat-val">{Math.max(...results.ranked.map(r=>r.maxWait))} mo</div></div>
            </div>
          </div>

          <div className="tab-bar">
            {["waiting","features","comparison"].map(t=>(
              <div key={t} className={`tab ${activeTab===t?"active":""}`} onClick={()=>setActiveTab(t)}>
                {t==="waiting"?"Waiting periods":t==="features"?"Policy features":"Full comparison"}
              </div>
            ))}
          </div>

          {activeTab === "waiting" && (
            <div className="card">
              <div className="card-title">Ranked by shortest waiting period</div>
              {results.ranked.map((r,i)=>{
                const ageMonths = parseInt(policyAge)||0;
                const covered = ageMonths >= r.maxWait && r.maxWait >= 0;
                return (
                  <div key={r.policy.id} className="policy-row">
                    <div className={`policy-rank ${i<3?"top":""}`}>{i+1}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                        <div className="policy-name">{r.policy.product}</div>
                        <div className="policy-insurer">{r.policy.insurer}</div>
                        {policyAge && <span className={`badge ${covered?"badge-green":"badge-red"}`}>{covered?"Covered now":"Waiting active"}</span>}
                      </div>
                      <div className="policy-tags">
                        {r.waits.map((w,j)=>(
                          <span key={j} className={`pill ${w.months===null?"pill-gray":w.months<=12?"pill-green":w.months<=24?"pill-amber":"pill-red"}`}>
                            {w.condition}: {w.months===null?"Not listed":w.months+" mo"}
                          </span>
                        ))}
                        <span className="pill pill-gray">PED: {r.policy.waitingPeriods.ped} mo</span>
                      </div>
                      {r.policy.copay.applicable && <div className="policy-detail">⚠ {r.policy.copay.percent}% copay applies</div>}
                      {r.policy.roomRent.type !== "any" && <div className="policy-detail">⚠ Room rent: {r.policy.roomRent.note}</div>}
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:20,fontWeight:500,color: r.maxWait<=12?"#2d7a4f":r.maxWait<=24?"#8a6200":"#9a2020"}}>{r.maxWait}<span style={{fontSize:12,fontWeight:400,color:"#888"}}> mo</span></div>
                      <div style={{fontSize:11,color:"#aaa"}}>max wait</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "features" && (
            <div className="card">
              <div className="card-title">Policy features comparison</div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Policy</th><th>PED wait</th><th>Copay</th><th>Room rent</th><th>Restoration</th><th>Maternity</th><th>Network</th><th>Settlement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.ranked.map(r=>(
                      <tr key={r.policy.id}>
                        <td><div style={{fontWeight:500}}>{r.policy.product}</div><div style={{fontSize:11,color:"#888"}}>{r.policy.insurer}</div></td>
                        <td><span className={`badge ${r.policy.waitingPeriods.ped<=36?"badge-green":"badge-amber"}`}>{r.policy.waitingPeriods.ped} mo</span></td>
                        <td>{r.policy.copay.applicable?<span className="badge badge-amber">{r.policy.copay.percent}%</span>:<span className="badge badge-green">None</span>}</td>
                        <td><span className={`badge ${r.policy.roomRent.type==="any"?"badge-green":"badge-amber"}`}>{r.policy.roomRent.type==="any"?"No limit":r.policy.roomRent.note.split("—")[0]}</span></td>
                        <td>{r.policy.restoration?<span className="badge badge-green">Yes</span>:<span className="badge badge-gray">No</span>}</td>
                        <td>{r.policy.maternity.covered?<span className="badge badge-green">{r.policy.maternity.waitingPeriod} mo wait</span>:<span className="badge badge-gray">No</span>}</td>
                        <td>{(r.policy.networkHospitals/1000).toFixed(0)}k+</td>
                        <td style={{fontSize:12}}>{r.policy.reimbursementTimeline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "comparison" && (
            <div className="card">
              <div className="card-title">Detailed waiting period matrix (months)</div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th style={{minWidth:120}}>Policy</th>
                      {results.conditions.map(c=><th key={c}>{c}</th>)}
                      <th>PED</th><th>Initial</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.ranked.map(r=>(
                      <tr key={r.policy.id}>
                        <td><div style={{fontWeight:500,fontSize:12}}>{r.policy.product}</div><div style={{fontSize:11,color:"#888"}}>{r.policy.insurer}</div></td>
                        {results.conditions.map(c=>{
                          const m = getWaitingMonths(r.policy,c);
                          return <td key={c}><span className={`badge ${m===null?"badge-gray":m<=12?"badge-green":m<=24?"badge-amber":"badge-red"}`}>{m===null?"N/A":m+" mo"}</span></td>;
                        })}
                        <td><span className={`badge ${r.policy.waitingPeriods.ped<=36?"badge-green":"badge-amber"}`}>{r.policy.waitingPeriods.ped} mo</span></td>
                        <td><span className="badge badge-gray">{r.policy.waitingPeriods.initial} days</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{marginTop:12,fontSize:12,color:"#aaa"}}>
                <span className="badge badge-green" style={{marginRight:6}}>≤12 mo</span>short
                <span className="badge badge-amber" style={{margin:"0 6px"}}>13–24 mo</span>moderate
                <span className="badge badge-red" style={{marginRight:6}}>25+ mo</span>long
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Module_DisclosureAudit() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [policyStart, setPolicyStart] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const cats = ["All", ...new Set(DISCLOSURE_QUESTIONS.map(q=>q.cat))];
  const filtered = activeFilter === "All" ? DISCLOSURE_QUESTIONS : DISCLOSURE_QUESTIONS.filter(q=>q.cat===activeFilter);

  const setAnswer = (id, val) => setAnswers(a=>({...a,[id]:val}));

  const yesAnswers = DISCLOSURE_QUESTIONS.filter(q=>answers[q.id]==="yes");
  const highRisk = yesAnswers.filter(q=>q.pedRisk==="high");
  const medRisk = yesAnswers.filter(q=>q.pedRisk==="medium");
  const unanswered = DISCLOSURE_QUESTIONS.filter(q=>!answers[q.id]);

  const overallRisk = highRisk.length >= 2 ? "high" : highRisk.length === 1 || medRisk.length >= 2 ? "medium" : yesAnswers.length > 0 ? "low" : null;

  return (
    <div>
      <div className="page-header">
        <h2>Disclosure Audit</h2>
        <p>Answer these questions to check if you declared all required conditions when taking out your policy. Non-disclosure is the #1 reason claims are rejected.</p>
      </div>

      <div className="card">
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
          <div style={{flex:1}}>
            <div className="card-title" style={{marginBottom:6}}>When did your policy start?</div>
            <input type="text" placeholder="e.g. January 2022 or 18 months ago" value={policyStart} onChange={e=>setPolicyStart(e.target.value)} />
          </div>
          <div style={{display:"flex",gap:12,flexShrink:0}}>
            <div className="stat-box" style={{minWidth:90,textAlign:"center"}}>
              <div className="stat-label">Answered</div>
              <div className="stat-val">{Object.keys(answers).length}/{DISCLOSURE_QUESTIONS.length}</div>
            </div>
            <div className="stat-box" style={{minWidth:90,textAlign:"center"}}>
              <div className="stat-label">Yes answers</div>
              <div className="stat-val" style={{color:yesAnswers.length>0?"#9a2020":"#2d7a4f"}}>{yesAnswers.length}</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {cats.map(c=>(
            <button key={c} className={activeFilter===c?"btn-primary":"btn-ghost"} style={{padding:"5px 14px",fontSize:12}} onClick={()=>setActiveFilter(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Conditions to declare ({filtered.length})</div>
        {filtered.map((q,i)=>(
          <div key={q.id} className="disclosure-q">
            <div className="dq-cat">{q.cat}</div>
            <div className="dq-label">{i+1 > filtered.indexOf(q) ? "" : ""}{q.condition}</div>
            <div className="dq-options">
              <button className={`dq-btn ${answers[q.id]==="yes"?"selected-yes":""}`} onClick={()=>setAnswer(q.id,"yes")}>Yes — I have / had this</button>
              <button className={`dq-btn ${answers[q.id]==="no"?"selected-no":""}`} onClick={()=>setAnswer(q.id,"no")}>No — never</button>
              <button className={`dq-btn ${answers[q.id]==="unsure"?"btn-primary":""}`} onClick={()=>setAnswer(q.id,"unsure")}>Not sure</button>
            </div>
            {answers[q.id]==="yes" && <div className="dq-note">⚠ {q.note}</div>}
          </div>
        ))}
      </div>

      {yesAnswers.length > 0 && (
        <div className="card">
          <div className="card-title">Disclosure risk summary</div>
          <div className={`verdict-block ${overallRisk==="high"?"risky":overallRisk==="medium"?"caution":"safe"}`} style={{marginBottom:16}}>
            <div className="verdict-title">
              {overallRisk==="high" ? "⚠ High non-disclosure risk" : overallRisk==="medium" ? "~ Medium risk — review carefully" : "✓ Low risk — declarations appear complete"}
            </div>
            <div className="verdict-text">
              You have answered "Yes" to {yesAnswers.length} condition{yesAnswers.length>1?"s":""}, of which {highRisk.length} are high-risk for claim rejection if undeclared.
              {highRisk.length > 0 && ` High-risk conditions: ${highRisk.map(q=>q.condition.split(" /")[0]).join(", ")}.`}
              {" "}If any of these were not declared in the proposal form, contact your insurer immediately for a material fact endorsement.
            </div>
          </div>

          {highRisk.length > 0 && (
            <>
              <div style={{fontSize:12,fontWeight:500,color:"#9a2020",marginBottom:10}}>HIGH RISK — must be declared</div>
              {highRisk.map(q=>(
                <div key={q.id} className="flag-bar danger">
                  <div>
                    <div className="flag-label">{q.condition}</div>
                    <div className="flag-desc">{q.note}</div>
                  </div>
                </div>
              ))}
            </>
          )}
          {medRisk.length > 0 && (
            <>
              <div style={{fontSize:12,fontWeight:500,color:"#8a6200",margin:"14px 0 10px"}}>MEDIUM RISK — should be declared</div>
              {medRisk.map(q=>(
                <div key={q.id} className="flag-bar warning">
                  <div>
                    <div className="flag-label">{q.condition}</div>
                    <div className="flag-desc">{q.note}</div>
                  </div>
                </div>
              ))}
            </>
          )}
          <div style={{marginTop:16,padding:"12px 16px",background:"#faf9f6",borderRadius:8,fontSize:12,color:"#555",lineHeight:1.7}}>
            <strong>What to do:</strong> If you answered "yes" to any condition that was not declared in your proposal form, contact your insurer in writing to add a material fact endorsement. This may result in a loading on premium or exclusion, but it protects your claim. Failing to disclose gives the insurer grounds to repudiate any future claim under Section 45 of the Insurance Act.
          </div>
        </div>
      )}

      {unanswered.length === 0 && yesAnswers.length === 0 && (
        <div className="verdict-block safe" style={{padding:"18px 20px"}}>
          <div className="verdict-title">✓ No disclosures required based on your answers</div>
          <div className="verdict-text">All questions answered as "No" — your policy appears to have full coverage without PED concerns.</div>
        </div>
      )}
    </div>
  );
}

function Module_TPALookup() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [hospital, setHospital] = useState("");
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  const filtered = TPA_DATA.filter(t =>
    !search || t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.insurer.toLowerCase().includes(search.toLowerCase())
  );

  const checkHospital = async () => {
    if (!selected || !hospital) return;
    setLoadingCheck(true); setCheckResult(null);
    const sys = `You are a health insurance TPA expert in India. Based on the TPA and hospital provided, give guidance on network status in a JSON object:
{
  "likelyNetwork": true|false|"unknown",
  "confidence": "high|medium|low",
  "note": "Practical guidance — how to verify, what documents to carry, pre-auth process",
  "preAuthSteps": ["Step 1","Step 2","Step 3"],
  "documentsNeeded": ["Doc 1","Doc 2"],
  "claimHotline": "hotline number or portal"
}
Return ONLY valid JSON.`;
    try {
      const res = await fetch("/api/claude",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,system:sys,
          messages:[{role:"user",content:`TPA: ${selected.name} (${selected.insurer}). Hospital: ${hospital}. Is this hospital likely in-network? Network size: ${selected.network} hospitals across India.`}]})
      });
      const data = await res.json();
      if (!data || !data.content) throw new Error((data && data.error && data.error.message) || JSON.stringify(data) || "API error");
      const raw = data.content.map(b=>b.text||"").join("").replace(/```json|```/g,"").trim();
      setCheckResult(JSON.parse(raw));
    } catch(e) { setCheckResult({likelyNetwork:"unknown",confidence:"low",note:"Unable to check automatically. Please call the TPA hotline directly.",preAuthSteps:["Call TPA hotline","Confirm hospital empanelment","Proceed with pre-auth"],documentsNeeded:[],claimHotline:selected.hotline}); }
    setLoadingCheck(false);
  };

  return (
    <div>
      <div className="page-header">
        <h2>TPA & Hospital Lookup</h2>
        <p>Find your TPA's network hospitals, pre-auth process, and verify if a specific hospital accepts cashless claims for your insurer.</p>
      </div>

      <div className="card">
        <div className="card-title">Select your TPA</div>
        <div className="search-box">
          <div className="search-icon">🔍</div>
          <input type="search" placeholder="Search by insurer or TPA name…" value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {filtered.map(t=>(
            <div key={t.name} className="tpa-card" style={{cursor:"pointer",borderColor:selected?.name===t.name?"#c9a96e":"#e8e3da",background:selected?.name===t.name?"#fdf8ee":"#fff"}} onClick={()=>{setSelected(t);setCheckResult(null);}}>
              <div className="tpa-name">{t.name}</div>
              <div className="tpa-insurer">{t.insurer}</div>
              <div style={{marginTop:10,display:"flex",gap:8,flexWrap:"wrap"}}>
                <span className="badge badge-gray">{(t.network/1000).toFixed(0)}k+ hospitals</span>
              </div>
              <div className="tpa-hotline" style={{marginTop:8}}>📞 {t.hotline}</div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="card">
          <div className="card-title">Check hospital network — {selected.name}</div>
          <div style={{display:"flex",gap:10,marginBottom:16}}>
            <input type="text" placeholder="Enter hospital name and city e.g. Apollo Hospital Bangalore" value={hospital} onChange={e=>setHospital(e.target.value)} style={{flex:1}} />
            <button className="btn-primary" onClick={checkHospital} disabled={!hospital||loadingCheck}>
              {loadingCheck && <span className="spinner"/>}{loadingCheck?"Checking…":"Check ↗"}
            </button>
          </div>

          <div style={{padding:"14px 16px",background:"#faf9f6",borderRadius:8,fontSize:13,color:"#555",lineHeight:1.7}}>
            <strong>Important:</strong> Always verify network status directly with {selected.name} before admission. Call {selected.hotline} or visit {selected.portal} for real-time verification.
          </div>

          {checkResult && (
            <div style={{marginTop:16}}>
              <div className={`verdict-block ${checkResult.likelyNetwork===true?"safe":checkResult.likelyNetwork===false?"risky":"caution"}`} style={{marginBottom:14}}>
                <div className="verdict-title">
                  {checkResult.likelyNetwork===true ? "✓ Likely in-network" : checkResult.likelyNetwork===false ? "⚠ Possibly out-of-network" : "~ Network status unclear"}
                  <span style={{marginLeft:8}} className={`badge ${checkResult.confidence==="high"?"badge-green":checkResult.confidence==="medium"?"badge-amber":"badge-red"}`}>{checkResult.confidence} confidence</span>
                </div>
                <div className="verdict-text">{checkResult.note}</div>
              </div>

              <div className="grid-2">
                {checkResult.preAuthSteps?.length > 0 && (
                  <div>
                    <div style={{fontSize:12,fontWeight:500,color:"#666",marginBottom:8}}>PRE-AUTH STEPS</div>
                    {checkResult.preAuthSteps.map((s,i)=>(
                      <div key={i} className="check-row">
                        <div className="check-circle neutral">{i+1}</div>
                        <div className="check-label">{s}</div>
                      </div>
                    ))}
                  </div>
                )}
                {checkResult.documentsNeeded?.length > 0 && (
                  <div>
                    <div style={{fontSize:12,fontWeight:500,color:"#666",marginBottom:8}}>DOCUMENTS NEEDED</div>
                    {checkResult.documentsNeeded.map((d,i)=>(
                      <div key={i} className="check-row">
                        <div className="check-circle neutral">📄</div>
                        <div className="check-label">{d}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="card">
        <div className="card-title">IRDA standard exclusions — applicable to all policies</div>
        {IRDA_EXCLUSIONS.map(e=>(
          <div key={e.code} className="check-row">
            <div className="check-circle" style={{background:"#f0ede8",color:"#888",fontSize:10}}>{e.code}</div>
            <div>
              <div className="check-label">{e.name}</div>
              <div className="check-note">{e.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Module_PolicyDB() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ped:"",copay:"",roomRent:"",maternity:""});
  const [selected, setSelected] = useState(null);

  const filtered = FULL_POLICY_DB.filter(p => {
    const s = search.toLowerCase();
    const nameMatch = !s || p.product.toLowerCase().includes(s) || p.insurer.toLowerCase().includes(s);
    const pedMatch = !filter.ped || (filter.ped==="36" ? p.waitingPeriods.ped<=36 : p.waitingPeriods.ped<=48);
    const copayMatch = !filter.copay || (filter.copay==="no" ? !p.copay.applicable : true);
    const rrMatch = !filter.roomRent || (filter.roomRent==="any" ? p.roomRent.type==="any" : true);
    const matMatch = !filter.maternity || (filter.maternity==="yes" ? p.maternity.covered : true);
    return nameMatch && pedMatch && copayMatch && rrMatch && matMatch;
  });

  return (
    <div>
      <div className="page-header">
        <h2>Policy Database</h2>
        <p>Structured database of {FULL_POLICY_DB.length} major Indian health insurance products with granular terms pre-extracted. Filter and compare side-by-side.</p>
      </div>

      <div className="card">
        <div className="card-title">Filter policies</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:12}}>
          <input type="search" placeholder="Search by product or insurer…" value={search} onChange={e=>setSearch(e.target.value)} style={{flex:1,minWidth:200}} />
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <select value={filter.ped} onChange={e=>setFilter(f=>({...f,ped:e.target.value}))} style={{width:"auto",paddingRight:28}}>
            <option value="">PED wait: Any</option>
            <option value="36">PED ≤ 36 months</option>
            <option value="48">PED ≤ 48 months</option>
          </select>
          <select value={filter.copay} onChange={e=>setFilter(f=>({...f,copay:e.target.value}))} style={{width:"auto",paddingRight:28}}>
            <option value="">Copay: Any</option>
            <option value="no">No copay</option>
          </select>
          <select value={filter.roomRent} onChange={e=>setFilter(f=>({...f,roomRent:e.target.value}))} style={{width:"auto",paddingRight:28}}>
            <option value="">Room rent: Any</option>
            <option value="any">No sub-limit</option>
          </select>
          <select value={filter.maternity} onChange={e=>setFilter(f=>({...f,maternity:e.target.value}))} style={{width:"auto",paddingRight:28}}>
            <option value="">Maternity: Any</option>
            <option value="yes">Maternity covered</option>
          </select>
          <button className="btn-ghost" onClick={()=>{setSearch("");setFilter({ped:"",copay:"",roomRent:"",maternity:""});}}>Clear</button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">{filtered.length} products</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th><th>PED wait</th><th>Specific illness</th><th>Copay</th><th>Room rent</th><th>Maternity</th><th>Network</th><th>Settlement</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p=>(
                <tr key={p.id} style={{cursor:"pointer"}} onClick={()=>setSelected(selected?.id===p.id?null:p)}>
                  <td>
                    <div style={{fontWeight:500}}>{p.product}</div>
                    <div style={{fontSize:11,color:"#888"}}>{p.insurer}</div>
                    <div style={{fontSize:11,color:"#aaa",marginTop:2}}>{p.type}</div>
                  </td>
                  <td><span className={`badge ${p.waitingPeriods.ped<=36?"badge-green":"badge-amber"}`}>{p.waitingPeriods.ped} mo</span></td>
                  <td style={{fontSize:12}}>12–48 mo range</td>
                  <td>{p.copay.applicable?<span className="badge badge-amber">{p.copay.percent}%</span>:<span className="badge badge-green">None</span>}</td>
                  <td><span className={`badge ${p.roomRent.type==="any"?"badge-green":"badge-amber"}`}>{p.roomRent.type==="any"?"No limit":"Has limit"}</span></td>
                  <td>{p.maternity.covered?<span className="badge badge-green">{p.maternity.waitingPeriod}mo</span>:<span className="badge badge-gray">No</span>}</td>
                  <td style={{fontSize:12}}>{(p.networkHospitals/1000).toFixed(0)}k+</td>
                  <td style={{fontSize:12}}>{p.reimbursementTimeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontFamily:"DM Serif Display, serif",fontSize:20,marginBottom:4}}>{selected.product}</div>
              <div style={{color:"#888",fontSize:13}}>{selected.insurer} · {selected.type} · TPA: {selected.tpa}</div>
            </div>
            <button className="btn-ghost" onClick={()=>setSelected(null)} style={{flexShrink:0}}>Close</button>
          </div>
          <hr style={{border:"none",borderTop:"1px solid #f0ede8",margin:"16px 0"}} />
          <div className="grid-3" style={{marginBottom:16}}>
            <div className="stat-box"><div className="stat-label">PED waiting period</div><div className="stat-val">{selected.waitingPeriods.ped} months</div></div>
            <div className="stat-box"><div className="stat-label">Network hospitals</div><div className="stat-val">{(selected.networkHospitals/1000).toFixed(0)}k+</div></div>
            <div className="stat-box"><div className="stat-label">Reimbursement</div><div className="stat-val" style={{fontSize:14}}>{selected.reimbursementTimeline}</div></div>
          </div>

          <div className="grid-2">
            <div>
              <div style={{fontSize:12,fontWeight:500,color:"#888",marginBottom:8}}>SPECIFIC ILLNESS WAITING PERIODS</div>
              {Object.entries(selected.waitingPeriods.specificIllness).map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #f5f3ef",fontSize:13}}>
                  <span style={{color:"#444"}}>{k}</span>
                  <span className={`badge ${v<=12?"badge-green":v<=24?"badge-amber":"badge-red"}`}>{v} mo</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{fontSize:12,fontWeight:500,color:"#888",marginBottom:8}}>KEY POLICY TERMS</div>
              {[
                {label:"Copay",val: selected.copay.applicable ? `${selected.copay.percent}% on all claims` : "None",ok:!selected.copay.applicable},
                {label:"Room rent",val:selected.roomRent.note,ok:selected.roomRent.type==="any"},
                {label:"Restoration",val:selected.restoration?"Yes":"No",ok:selected.restoration},
                {label:"Maternity",val:selected.maternity.covered?`Yes — ${selected.maternity.waitingPeriod}mo wait, ₹${(selected.maternity.sublimit||0).toLocaleString()} limit`:"Not covered",ok:selected.maternity.covered},
                {label:"NCB",val:selected.ncb},
                {label:"Cashless pre-auth",val:selected.cashlessProcess},
              ].map((r,i)=>(
                <div key={i} style={{padding:"7px 0",borderBottom:"1px solid #f5f3ef"}}>
                  <div style={{fontSize:11,color:"#aaa"}}>{r.label}</div>
                  <div style={{fontSize:13,color:"#333",marginTop:2}}>{r.val}</div>
                </div>
              ))}

              {Object.keys(selected.subLimits||{}).length > 0 && (
                <div style={{marginTop:14}}>
                  <div style={{fontSize:12,fontWeight:500,color:"#9a2020",marginBottom:6}}>⚠ SUB-LIMITS</div>
                  {Object.entries(selected.subLimits).map(([k,v])=>(
                    <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:13}}>
                      <span>{k}</span><span style={{fontWeight:500}}>₹{v.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{marginTop:14}}>
                <div style={{fontSize:12,fontWeight:500,color:"#888",marginBottom:6}}>POLICY EXCLUSIONS</div>
                {selected.exclusions.slice(0,5).map((e,i)=>(
                  <div key={i} style={{fontSize:12,color:"#777",padding:"3px 0",borderBottom:"1px solid #f8f6f2"}}>• {e}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

const MODULES = [
  { id: "analyzer", icon: "📋", label: "Policy Analyzer", component: Module_PolicyAnalyzer },
  { id: "compare", icon: "⚖", label: "Policy Comparison", component: Module_PolicyComparison },
  { id: "disclosure", icon: "🛡", label: "Disclosure Audit", component: Module_DisclosureAudit },
  { id: "tpa", icon: "🏥", label: "TPA & Hospitals", component: Module_TPALookup },
  { id: "database", icon: "🗂", label: "Policy Database", component: Module_PolicyDB },
];

export default function App() {
  const [active, setActive] = useState("analyzer");
  const ActiveModule = MODULES.find(m => m.id === active)?.component || Module_PolicyAnalyzer;

  return (
    <>
      <style>{css}</style>
      <div className="app-shell">
        <div className="sidebar">
          <div className="sidebar-logo">
            <h1>Policy<br/>Clarity</h1>
            <p>Health Insurance Decoder</p>
          </div>
          <nav className="sidebar-nav">
            {MODULES.map(m => (
              <div key={m.id} className={`nav-item ${active === m.id ? "active" : ""}`} onClick={() => setActive(m.id)}>
                <span className="nav-icon">{m.icon}</span>
                {m.label}
              </div>
            ))}
          </nav>
          <div style={{padding:"20px",borderTop:"1px solid #333",marginTop:"auto",position:"absolute",bottom:0,width:"100%"}}>
            <div style={{fontSize:10,color:"#555",lineHeight:1.6}}>
              Based on IRDA guidelines.<br/>
              Not financial / legal advice.<br/>
              Always verify with your insurer.
            </div>
          </div>
        </div>
        <div className="main-content">
          <ActiveModule />
        </div>
      </div>
    </>
  );
}
