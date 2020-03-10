$u = @()
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_a.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_ayi.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_e.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_i.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_o.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_u.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_v.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_w.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_wa.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_wa4.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_wawa.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_wo.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_wo1.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_wo3.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_wu.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_wu1.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_wu3.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_wuya.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_y.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_ya.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_ya1.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_ya2.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_ya3.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_yi.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_yi1.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_yi3.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_yu.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_yu2.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_yu3.mp3"
$u += "https://www.mtl.moe.edu.sg/xuele/PYCB/Files/sound-moe_l1_learn_yuyi.mp3"


$OutPath = "C:\Users\Jared\Desktop\Tingxie\"

ForEach ( $item in $u) {
$file = $OutPath +  ($item).split('/')[-1]
(New-Object System.Net.WebClient).DownloadFile($item, $file)
}