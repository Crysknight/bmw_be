<?php
$carBrands = [
    'Audi',
'Bentley',
'BMW',
'Cadillac',
'Chevrolet',
'Chrysler',
'Citroen',
'Daewoo',
'Dodge',
'FIAT',
'Ford',
'Geely',
'Great Wall',
'Honda',
'Hyundai',
'Infiniti',
'Jaguar',
'KIA',
'Lada',
'Land Rover',
'Lexus',
'Mazda',
'Mercedes-Benz',
'MINI',
'Mitsubishi',
'Nissan',
'Opel',
'Peugeot',
'Porsche',
'Renault',
'Rolls-Royce',
'SEAT',
'Skoda',
'smart',
'SsangYong',
'Subaru',
'Suzuki',
'Toyota',
'UAZ',
'Volvo',
'VW',
'ZAZ',
'Другое'
];
$i = 0;
$carBrandsFormatted = [];
foreach ($carBrands as $brand){
    $carBrandsFormatted[$i] = '<option value="'.$brand.'">'.$brand.'</option>';
    $i++;
}



$carModels = ["251 SB", "Bandit", "B-King", "Boulevard", "Colleda", "Desperado 400", "DF 200", "Djebel 200", "Djebel 250 XC", "DL V-STROM", "DR 125", "DR 200 SE", "DR 250 S", "DR 350", "DR 600 R DAKAR", "DR 650 R DAKAR", "DR 650 RS", "DR 650 RSE", "DR 650 SE", "DR BIG 800 S", "DR-Z 125", "DR-Z 400", "DR-Z 70", "GF 250", "Gladius", "GN 125", "Grand Vitara", "Grasstracker", "GS 1000", "GS 125 ES", "GS 400", "GS 500", "GS 650 G Katana", "GS 750", "GSF 1200 Bandit", "GSF 1250 Bandit", "GSF 400 Bandit", "GSF 600 Bandit", "GSF 650 Bandit", "GSF 750 Bandit", "GSR 400", "GSR 600", "GSR 750", "GSX 1100", "GSX 1200", "GSX 1250 FA", "GSX 1300 R Hayabusa", "GSX 1400", "GSX 250", "GSX 400", "GSX 600 F", "GSX 650 F", "GSX 750", "GSX-R 1000", "GSX-R 1100", "GSXR 250", "GSX-R 400", "GSX-R 600", "GSX-R 750", "GV 1400", "GZ 250", "Impulse 400", "Inazuma 400", "Intruder 400", "Intruder C1800R (VLR1800)", "Intruder C1800RT", "Intruder C800", "Intruder Classic", "Intruder M 1500", "Intruder M1800R", "Intruder M800", "Jimny", "Kizashi", "LS 400 Savage", "LS 650 Savage", "PV 50", "RF 400", "RF 600 R", "RF 900", "RG 250", "RGV 250 Gamma", "RM", "RMX", "RV", "RV 125 (VANVAN 125)", "SFV 650", "Splash", "ST 250", "SV 1000", "SV 400 S", "SV 650", "Swift", "SX4", "T 20", "TL 1000", "TS 125", "TS 250", "TU 250", "Vanvan", "VL 1500", "VL 400 Intruder", "VL 800 Intruder Volusia", "VOLTY 250", "VS 1400 Intruder", "VS 400 Intruder", "VS 750 Intruder", "VS 800 GL", "VS 800 Intruder", "VX 800", "VZ 1600 Marauder", "VZ 400T Desperado", "VZ 800", "VZ 800 Desperado", "VZ 800 Marauder", "VZR", "Wolf", "XF 650 Freewind"];
$carModelsFormatted = [];
foreach ($carModels as $model){
    $carModelsFormatted[$i] = '<option value="'.$model.'">'.$model.'</option>';
    $i++;
}
if($_POST['brand']){
    echo implode("\n", $carModelsFormatted);
} else{
    echo implode("\n", $carBrandsFormatted);
}