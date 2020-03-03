$u = @()
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_gongchang.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_gongke.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_gou3.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_houzi.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_kou3.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_laogonggong.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_ong.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_ong1.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_ong2.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_ou2.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_ou3.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_ou4.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_ou.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_outu.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_rou3.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_rou4.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_songshu.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_tou2.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_youyong.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l6_learn_zou3.mp3"


$OutPath = "C:\Users\Jacob\Desktop\Tingxie\T1_6\"

ForEach ( $item in $u) {
$file = $OutPath +  ($item).split('/')[-1]
(New-Object System.Net.WebClient).DownloadFile($item, $file)
}