import React from 'react';

export const Logo: React.FC<{
    color: string,
    size: number | string,
    style?: object
}> = props => (
    <svg viewBox="0 0 320 320" width={props.size} height={props.size} style={props.style}>
        <g fill={props.color}>
            <path d="M152.282645,125.738512 C156.778512,130.797686 158.018843,155.934876 146.781818,158.719669 C130.676033,162.713058 121.396033,142.635041 130.37719,129.935537 C133.75438,125.161983 149.370909,122.461818 152.282645,125.738512 Z M316.175537,149.704132 C311.290909,62.6879339 236.791736,-3.88793388 149.783471,0.996694215 C62.7699174,5.88396694 -3.80859504,80.3831405 1.07603306,167.39405 C5.96066116,254.410248 80.4598347,320.986116 167.470744,316.104132 C170.281983,315.945455 173.069421,315.712727 175.833058,315.41124 C175.833058,315.41124 199.214215,231.896529 165.119669,213.18843 C155.294876,207.796033 141.817851,213.603636 128.35405,203.162645 L104.470413,210.004298 L125.844298,201.017851 C125.146116,200.375207 124.471736,199.706116 123.837025,199.002645 L97.3642975,199.520992 L121.562645,196.143802 C120.70843,194.929917 119.952066,193.63405 119.304132,192.258843 L100.180826,183.944132 L118.116694,189.318017 C117.854876,188.519339 117.619504,187.704793 117.431736,186.853223 C116.633058,183.28562 106.160331,179.37157 107.37686,170.313719 C108.225785,163.990413 115.501157,157.101157 115.617521,154.118017 C116.032727,143.510413 118.693223,138.985455 124.400331,128.38843 C115.181157,153.779504 135.267107,171.601653 154.504132,163.117686 C164.114711,158.875702 167.547438,143.42314 164.58281,125.254545 C164.389752,124.135868 221.860165,108.12 226.319008,110.18281 C231.719339,112.66876 241.403967,122.525289 244.035372,122.768595 C246.661488,123.011901 257.02843,122.02281 257.27438,119.378182 C257.522975,116.733554 234.118017,101.294215 228.569587,100.884298 C223.650579,100.524628 147.395372,115.609587 144.123967,116.268099 C141.64595,116.765289 139.450909,117.418512 137.483306,118.188099 C145.837686,105.163306 174.793719,90.1206612 203.109752,89.0522314 C196.143802,62.7090909 217.623471,16.7692562 217.623471,16.7692562 C217.623471,16.7692562 248.602645,59.4641322 257.554711,92.9213223 C266.501488,126.378512 257.999008,183.317355 299.286942,230.034711 C311.523636,206.016198 317.79405,178.559669 316.175537,149.704132 Z" id="Fill-3" transform="translate(158.625125, 158.550281) scale(-1, 1) translate(-158.625125, -158.550281) "></path>
        </g>
    </svg>
);

export const LogoTextual: React.FC<{
    color: string,
    size: number | string
}> = props => (
    <svg width={Number(props.size) * 4.8} height={props.size} viewBox="0 0 1050 220">
       <g fill={props.color}>
            <path d="M20.0039062,109.679688 C21.3059961,98.8723418 24.1054473,89.1556421 28.4023438,80.5292969 C32.6992402,71.9029517 38.1191079,65.5065312 44.6621094,61.3398438 C51.2051108,57.1731563 58.6431875,55.187499 66.9765625,55.3828125 C77.5234902,55.6432305 85.5312227,60.135373 91,68.859375 L95.9804688,57.2382812 L124.203125,57.3359375 L98.8125,203.625 L66.5859375,203.625 L76.4492188,154.015625 C69.3528291,161.567746 61.3125449,165.213543 52.328125,164.953125 C42.3671377,164.822916 34.4896123,161.079464 28.6953125,153.722656 C22.9010127,146.365849 19.8085957,136.372459 19.4179688,123.742188 C19.2877598,119.966127 19.4830703,115.278674 20.0039062,109.679688 Z M51.4492188,119.835938 C50.9934873,125.630237 51.6770742,130.333966 53.5,133.947266 C55.3229258,137.560565 58.252584,139.432291 62.2890625,139.5625 C68.8646162,139.822918 74.4635186,136.990915 79.0859375,131.066406 L86.6054688,88.9765625 C84.652334,83.6379941 80.3229502,80.838543 73.6171875,80.578125 C61.8332744,80.3828115 54.7044395,90.0832354 52.2304688,109.679688 L51.4492188,119.835938 Z M190.023438,151.476562 C182.145794,160.786505 172.640681,165.311199 161.507812,165.050781 C151.156198,164.920572 143.360052,161.307327 138.119141,154.210938 C132.878229,147.114548 130.843744,137.609435 132.015625,125.695312 L143.441406,57.3359375 L175.570312,57.3359375 L163.949219,126.085938 C163.753905,127.973968 163.753905,129.699211 163.949219,131.261719 C164.40495,136.600287 167.562471,139.367187 173.421875,139.5625 C180.192742,139.822918 185.954403,137.153674 190.707031,131.554688 L203.792969,57.3359375 L236.117188,57.3359375 L217.757812,163 L187.875,163 L190.023438,151.476562 Z M287.582031,164.953125 C278.14188,164.888021 269.72725,162.658225 262.337891,158.263672 C254.948531,153.869119 249.365904,147.749388 245.589844,139.904297 C241.813783,132.059206 240.316402,123.416714 241.097656,113.976562 L241.390625,111.242188 C243.148446,93.8592881 249.186797,80.1061704 259.505859,69.9824219 C269.824921,59.8586733 282.471279,54.9921855 297.445312,55.3828125 C306.494837,55.5130215 314.242155,57.8079204 320.6875,62.2675781 C327.132845,66.7272358 331.85285,72.8795181 334.847656,80.7246094 C337.842463,88.5697007 338.819016,97.3749512 337.777344,107.140625 L335.921875,120.519531 L273.03125,120.519531 C273.161459,126.053413 274.723943,130.545556 277.71875,133.996094 C280.713557,137.446632 285.075492,139.26953 290.804687,139.464844 C300.11463,139.725262 308.480432,136.144568 315.902344,128.722656 L329.378906,146.59375 C325.407532,152.257841 319.857458,156.701156 312.728516,159.923828 C305.599574,163.1465 297.803428,164.822916 289.339844,164.953125 L287.582031,164.953125 Z M295.394531,80.6757812 C290.837217,80.5455723 286.882178,81.9778496 283.529297,84.9726562 C280.176416,87.9674629 277.263033,92.9804336 274.789062,100.011719 L306.917969,100.011719 L307.503906,97.1796875 C307.894533,94.9010303 307.959637,92.7526143 307.699219,90.734375 C306.592442,84.2239258 302.490921,80.8710947 295.394531,80.6757812 Z M401.253906,132.726562 C402.100265,128.429666 398.779985,125.207042 391.292969,123.058594 L384.359375,121.300781 C373.031193,118.305975 364.730495,114.106798 359.457031,108.703125 C354.183567,103.299452 351.709634,96.8867559 352.035156,89.4648438 C352.360679,79.308543 356.869097,71.0566724 365.560547,64.7089844 C374.251997,58.3612964 384.847594,55.2526035 397.347656,55.3828125 C409.782614,55.5130215 419.857383,58.670542 427.572266,64.8554688 C435.287148,71.0403955 439.209635,79.3736455 439.339844,89.8554688 L407.308594,89.7578125 C407.569012,81.4244375 403.890663,77.2578125 396.273438,77.2578125 C393.018213,77.2578125 389.990899,78.2180894 387.191406,80.1386719 C384.391913,82.0592544 382.731773,84.6145674 382.210938,87.8046875 C381.104161,93.0781514 385.759063,96.6913965 396.175781,98.6445312 C405.225306,100.792979 412.223934,103.283189 417.171875,106.115234 C422.119816,108.94728 425.89582,112.446594 428.5,116.613281 C431.10418,120.779969 432.308595,125.792939 432.113281,131.652344 C431.917968,138.032584 429.834655,143.729142 425.863281,148.742188 C421.891907,153.755233 416.146522,157.7591 408.626953,160.753906 C401.107384,163.748713 392.953169,165.148438 384.164062,164.953125 C376.546837,164.888021 369.46683,163.292984 362.923828,160.167969 C356.380827,157.042953 351.270201,152.794949 347.591797,147.423828 C343.913393,142.052708 342.009115,135.884149 341.878906,128.917969 L371.761719,129.113281 C371.891928,138.488328 376.579381,143.110678 385.824219,142.980469 C389.795593,142.980469 393.180976,142.085295 395.980469,140.294922 C398.779962,138.504548 400.537757,135.981787 401.253906,132.726562 Z M502.328125,31.0664062 L497.738281,57.3359375 L514.632812,57.3359375 L510.628906,80.1875 L493.734375,80.1875 L485.53125,128.722656 C485.075519,132.042985 485.287105,134.549471 486.166016,136.242188 C487.044926,137.934904 489.24217,138.846354 492.757812,138.976562 C494.125007,139.041667 496.924458,138.878908 501.15625,138.488281 L498.8125,162.316406 C493.408827,164.074228 487.647166,164.888021 481.527344,164.757812 C471.566356,164.627604 464.112004,161.697945 459.164062,155.96875 C454.216121,150.239555 452.197912,142.459685 453.109375,132.628906 L461.703125,80.1875 L448.617188,80.1875 L452.523438,57.3359375 L465.609375,57.3359375 L470.199219,31.0664062 L502.328125,31.0664062 Z M543.539062,163 L511.3125,163 L529.671875,57.3359375 L561.898438,57.3359375 L543.539062,163 Z M532.503906,30.6757812 C532.373697,25.9231533 534.050113,21.9518389 537.533203,18.7617188 C541.016293,15.5715986 545.231746,13.9765625 550.179688,13.9765625 C555.192733,13.9765625 559.375634,15.4088398 562.728516,18.2734375 C566.081397,21.1380352 567.822916,24.8814873 567.953125,29.5039062 C568.083334,34.3216387 566.423194,38.309229 562.972656,41.4667969 C559.522118,44.6243647 555.29039,46.203125 550.277344,46.203125 C545.394507,46.203125 541.244158,44.7871235 537.826172,41.9550781 C534.408186,39.1230327 532.634115,35.3633047 532.503906,30.6757812 Z M625.570312,55.3828125 C635.010464,55.5130215 643.180955,57.8730239 650.082031,62.4628906 C656.983107,67.0527573 662.044906,73.4491777 665.267578,81.6523438 C668.49025,89.8555098 669.645838,98.970002 668.734375,108.996094 L668.539062,111.144531 C666.716137,127.35555 660.694062,140.441356 650.472656,150.402344 C640.251251,160.363331 627.621169,165.213543 612.582031,164.953125 C603.206984,164.822916 595.101597,162.495465 588.265625,157.970703 C581.429653,153.445941 576.367855,147.114624 573.080078,138.976562 C569.792301,130.838501 568.604162,121.789112 569.515625,111.828125 C571.143237,94.5103301 577.083933,80.7083848 587.337891,70.421875 C597.591848,60.1353652 610.335861,55.1223945 625.570312,55.3828125 Z M601.644531,111.828125 L601.351562,117.589844 C600.4401,132.108146 604.867139,139.497395 614.632812,139.757812 C627.263084,140.148439 634.587229,129.894636 636.605469,108.996094 L636.996094,100.109375 C637.126303,94.2499707 636.035819,89.5787935 633.724609,86.0957031 C631.4134,82.6126128 628.011741,80.8059902 623.519531,80.6757812 C617.595022,80.4804678 612.728535,82.9055737 608.919922,87.9511719 C605.111309,92.99677 602.686203,100.955675 601.644531,111.828125 Z M721.566406,57.2382812 L719.320312,69.9335938 C727.783896,59.907502 737.972597,55.0247383 749.886719,55.2851562 C759.652393,55.4804697 766.92771,59.1099907 771.712891,66.1738281 C776.498071,73.2376655 778.23959,83.3449863 776.9375,96.4960938 L765.804688,163 L733.578125,163 L744.808594,96.3007812 C745.069012,94.022124 745.134115,91.9388115 745.003906,90.0507812 C744.548175,83.8658545 740.902378,80.7734375 734.066406,80.7734375 C728.402315,80.6432285 723.226586,83.1497139 718.539062,88.2929688 L705.355469,163 L673.226562,163 L691.585938,57.3359375 L721.566406,57.2382812 Z M843.832031,132.726562 C844.67839,128.429666 841.35811,125.207042 833.871094,123.058594 L826.9375,121.300781 C815.609318,118.305975 807.30862,114.106798 802.035156,108.703125 C796.761692,103.299452 794.287759,96.8867559 794.613281,89.4648438 C794.938804,79.308543 799.447222,71.0566724 808.138672,64.7089844 C816.830122,58.3612964 827.425719,55.2526035 839.925781,55.3828125 C852.360739,55.5130215 862.435508,58.670542 870.150391,64.8554688 C877.865273,71.0403955 881.78776,79.3736455 881.917969,89.8554688 L849.886719,89.7578125 C850.147137,81.4244375 846.468788,77.2578125 838.851562,77.2578125 C835.596338,77.2578125 832.569024,78.2180894 829.769531,80.1386719 C826.970038,82.0592544 825.309898,84.6145674 824.789062,87.8046875 C823.682286,93.0781514 828.337188,96.6913965 838.753906,98.6445312 C847.803431,100.792979 854.802059,103.283189 859.75,106.115234 C864.697941,108.94728 868.473945,112.446594 871.078125,116.613281 C873.682305,120.779969 874.88672,125.792939 874.691406,131.652344 C874.496093,138.032584 872.41278,143.729142 868.441406,148.742188 C864.470032,153.755233 858.724647,157.7591 851.205078,160.753906 C843.685509,163.748713 835.531294,165.148438 826.742188,164.953125 C819.124962,164.888021 812.044955,163.292984 805.501953,160.167969 C798.958952,157.042953 793.848326,152.794949 790.169922,147.423828 C786.491518,142.052708 784.58724,135.884149 784.457031,128.917969 L814.339844,129.113281 C814.470053,138.488328 819.157506,143.110678 828.402344,142.980469 C832.373718,142.980469 835.759101,142.085295 838.558594,140.294922 C841.358087,138.504548 843.115882,135.981787 843.832031,132.726562 Z" id="questions" fill={props.color}></path>
            <path d="M972.576172,102.917969 C972.576172,109.851597 971.290377,115.987604 968.71875,121.326172 C966.147123,126.66474 962.493188,130.7744 957.756836,133.655273 C953.020484,136.536147 947.62503,137.976562 941.570312,137.976562 C935.515595,137.976562 930.144555,136.584975 925.457031,133.801758 C920.769508,131.018541 917.115573,127.039088 914.495117,121.863281 C911.874661,116.687474 910.49935,110.746778 910.369141,104.041016 L910.369141,100.037109 C910.369141,93.0709287 911.646797,86.9267844 914.202148,81.6044922 C916.7575,76.2822 920.419573,72.1725405 925.188477,69.2753906 C929.957381,66.3782407 935.385386,64.9296875 941.472656,64.9296875 C947.494822,64.9296875 952.865862,66.3619648 957.585938,69.2265625 C962.306013,72.0911602 965.976224,76.1682678 968.59668,81.4580078 C971.217135,86.7477478 972.54362,92.8105127 972.576172,99.6464844 L972.576172,102.917969 Z M955.144531,99.9394531 C955.144531,92.8756157 953.96453,87.5127136 951.604492,83.8505859 C949.244454,80.1884583 945.867209,78.3574219 941.472656,78.3574219 C932.878863,78.3574219 928.337893,84.8026699 927.849609,97.6933594 L927.800781,102.917969 C927.800781,109.884149 928.956369,115.238914 931.267578,118.982422 C933.578788,122.72593 937.012998,124.597656 941.570312,124.597656 C945.899761,124.597656 949.236316,122.758482 951.580078,119.080078 C953.92384,115.401674 955.111979,110.112014 955.144531,103.210938 L955.144531,99.9394531 Z M1026.18945,108.679688 L998.552734,108.679688 L998.552734,137 L981.414062,137 L981.414062,65.90625 L1028.97266,65.90625 L1028.97266,79.1386719 L998.552734,79.1386719 L998.552734,95.4960938 L1026.18945,95.4960938 L1026.18945,108.679688 Z" id="OF" fill={props.color}></path>
            <path d="M907,161 L1031,161" stroke={props.color} strokeWidth="15"></path>
        </g>
    </svg>
);