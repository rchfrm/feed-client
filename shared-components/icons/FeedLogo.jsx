import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '~/constants/brandColors'

const { green, textColor: black, bgColor: white } = brandColors

const FeedLogo = ({ className, style, textColor }) => {
  return (
    <div className={['FeedLogo', className].join(' ')} style={style}>
      <svg width="1450" height="1434" viewBox="0 0 1450 1434" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="594" cy="594" r="594" fill={green} />
        <path d="M850.41 511.458C849.762 440.301 821.03 372.278 770.465 322.19C719.9 272.101 651.594 244 580.408 244C509.222 244 440.916 272.101 390.351 322.19C339.787 372.278 311.055 440.301 310.407 511.458V882.167H850.41V511.458Z" fill={white} />
        <path d="M592.962 855.391C624.395 819.848 640.515 773.335 637.815 725.972C635.116 678.608 613.815 634.227 578.548 602.483C543.28 570.739 496.899 554.202 449.496 556.469C402.093 558.736 357.503 579.624 325.428 614.589L160 798.249L427.534 1039.05L592.962 855.391Z" fill={black} />
        <path className="text" d="M787 1256.47L942.838 1429.61L973.508 1402L958.592 1385.43L961.065 1383.2C978.058 1387.16 998.39 1385.87 1019.66 1366.73C1048.85 1340.46 1052.8 1292.13 1016.74 1252.06C980.672 1211.99 932.191 1210.85 903.005 1237.12C881.734 1256.27 878.322 1276.35 880.302 1292.48L877.828 1294.71L818.165 1228.42L787 1256.47ZM917.65 1272.29C936.942 1254.93 963.755 1255.87 985.572 1280.11C1007.39 1304.35 1005.51 1331.11 986.219 1348.47C966.926 1365.84 940.114 1364.9 918.297 1340.66C896.479 1316.42 898.358 1289.66 917.65 1272.29Z" fill={textColor} />
        <path className="text" d="M1029.48 1240.59C1064.65 1279.67 1113.28 1282.46 1149.89 1249.51C1183.53 1219.23 1180.98 1187.05 1176.1 1167.71L1138.61 1177.29C1142.86 1190.47 1144.15 1206.32 1126.83 1221.91C1109.52 1237.49 1085.5 1237.17 1069.62 1221.02L1158.91 1140.65L1149.34 1130.02C1115.5 1092.42 1068.85 1087.85 1032.74 1120.35C996.626 1152.86 994.304 1201.51 1029.48 1240.59ZM1048.94 1197.55C1038.68 1182.16 1039.72 1162.43 1056.53 1147.29C1072.61 1132.82 1092.15 1133.14 1106.33 1145.9L1048.94 1197.55Z" fill={textColor} />
        <path className="text" d="M1123.41 1090.67L1154.08 1063.06L1216.87 1132.81C1232 1149.63 1252.68 1150.72 1269.01 1136.03L1303.63 1104.86L1280.93 1079.63L1257.18 1101C1252.73 1105.01 1248.03 1104.76 1243.58 1099.82L1185.25 1035.01L1218.89 1004.74L1196.18 979.508L1162.54 1009.79L1128.26 971.695L1097.09 999.746L1131.38 1037.84L1100.71 1065.44L1123.41 1090.67Z" fill={textColor} />
        <path className="text" d="M1446.64 976.136L1336.22 853.457L1305.55 881.062L1320.47 897.634L1318 899.86C1301 895.903 1280.67 897.191 1259.4 916.336C1230.21 942.606 1226.26 990.938 1262.32 1031.01C1298.39 1071.08 1346.87 1072.21 1376.06 1045.94C1397.33 1026.8 1400.74 1006.71 1398.59 989.396L1401.06 987.17L1415.98 1003.74L1446.64 976.136ZM1361.41 1010.77C1342.12 1028.13 1315.31 1027.2 1293.49 1002.96C1271.67 978.717 1273.55 951.954 1292.84 934.589C1312.13 917.224 1338.95 918.163 1360.76 942.402C1382.58 966.641 1380.7 993.404 1361.41 1010.77Z" fill={textColor} />
      </svg>
    </div>
  )
}

FeedLogo.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  textColor: PropTypes.string,
}

FeedLogo.defaultProps = {
  className: '',
  style: {},
  textColor: black,
}


export default FeedLogo
