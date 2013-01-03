#!/bin/bash

#srcBase="C:/Users/iantropov/Work/i-Free/image_source/нарезка1600x900/"
#dstBase="C:/I_free_git/images/1/"

#srcBase="C:/Users/iantropov/Work/i-Free/image_source/нарезка1280x800/"
#dstBase="C:/I_free_git/images/0.89/"

#srcBase="C:/Users/iantropov/Work/i-Free/image_source/нарезка1024x600/"
#dstBase="C:/I_free_git/images/0.67/"

#srcBase="C:/Users/iantropov/Work/i-Free/image_source/нарезка800x480/"
#dstBase="C:/I_free_git/images/0.53/"

srcBase="C:/Users/iantropov/Work/i-Free/image_source/нарезка480x320/"
dstBase="C:/I_free_git/images/0.36/"

function copySingleImage ()
{
	cp "${srcBase}$1.$3" "$dstBase$2.$3"
}

function copySingleImagePNG ()
{
	copySingleImage "$1" $2 "png"
}

function copySingleImageJPEG ()
{
	copySingleImage "$1" $2 "jpg"
}

function copyAnimation ()
{
	for ((a = 0; a < $3; a++)) 
	do
		b=$(($a+1))
		copySingleImagePNG "$1$b" "$2-$a"
	done
}

function prepareFolders ()
{
	mkdir "${dstBase}"
	mkdir "${dstBase}people"
	mkdir "${dstBase}photos"
	mkdir "${dstBase}polaroid"
	mkdir "${dstBase}popup"
	mkdir "${dstBase}station"
	mkdir "${dstBase}wood"
	mkdir "${dstBase}world"

	mkdir "${dstBase}photos/allover"
	mkdir "${dstBase}photos/android"
	mkdir "${dstBase}photos/bada"
	mkdir "${dstBase}photos/billing"
	mkdir "${dstBase}photos/catocal"
	mkdir "${dstBase}photos/countries"
	mkdir "${dstBase}photos/developers"
	mkdir "${dstBase}photos/development"
	mkdir "${dstBase}photos/employees"
	mkdir "${dstBase}photos/empty"
	mkdir "${dstBase}photos/flinter"
	mkdir "${dstBase}photos/galaxy"
	mkdir "${dstBase}photos/hr-brand"
	mkdir "${dstBase}photos/ios"
	mkdir "${dstBase}photos/jail"
	mkdir "${dstBase}photos/java"
	mkdir "${dstBase}photos/mogames"
	mkdir "${dstBase}photos/monetization"
	mkdir "${dstBase}photos/partners"
	mkdir "${dstBase}photos/rdteam"
	mkdir "${dstBase}photos/smartive"
	mkdir "${dstBase}photos/sns"
	mkdir "${dstBase}photos/symbian"
	mkdir "${dstBase}photos/thanks"
	mkdir "${dstBase}photos/webos"
	mkdir "${dstBase}photos/industries"
	mkdir "${dstBase}photos/portals"
	mkdir "${dstBase}photos/pocket"
	mkdir "${dstBase}photos/warspear"
}

prepareFolders

copyAnimation "анимация/мир/блики_озера/" "world/world-lake-highlight" 2
copyAnimation "анимация/мир/дерево_Германия/" "wood/wood-near-cath" 3
copyAnimation "анимация/мир/зонт/" "world/world-umbrella" 3
copyAnimation "анимация/мир/колесо/" "wood/wood-near-city" 3
copyAnimation "анимация/мир/логотип/" "world/world-logo" 6
copyAnimation "анимация/мир/Нью_Йорк/" "world/world-city" 8
copyAnimation "анимация/мир/пальма у озера/" "wood/wood-near-lake" 6
copyAnimation "анимация/мир/пальмы/" "wood/wood-near-statue" 4
copyAnimation "анимация/мир/сакура/" "wood/wood-near-pagoda" 6
copyAnimation "анимация/мир/самолет/" "plane" 6
copyAnimation "анимация/мир/собор/" "world/world-cath" 4
copyAnimation "анимация/мир/фонарики/" "world/world-pagoda" 4
copyAnimation "анимация/мир/чайки/" "birds" 6

copyAnimation "анимация/люди/американцы/" "people/people-near-city" 6
copyAnimation "анимация/люди/Бразильцы/" "people/people-near-statue" 2
copyAnimation "анимация/люди/Кенгуру/" "people/people-near-theater" 6
copyAnimation "анимация/люди/Китай/" "people/people-near-pagoda" 6
copyAnimation "анимация/люди/Немцы/" "people/people-near-cath" 6
copyAnimation "анимация/люди/программисты/" "people/people-near-lake" 6
copyAnimation "анимация/люди/ЛюдиПоездB2b/" "station/station-b2b-input" 6
copyAnimation "анимация/люди/ЛюдиПоездDepartment/" "station/station-development-input" 6
copyAnimation "анимация/люди/ЛюдиПоездProducts/" "station/station-products-input" 6

#copySingleImagePNG "статика/b2b" "station/station-b2b"
copySingleImagePNG "статика/balloon" "balloon"
copySingleImagePNG "статика/Brasil" "world/world-statue"
copySingleImagePNG "статика/buble" "popup/popup-clickme"
#copySingleImagePNG "статика/Department" "station/station-development"
copySingleImagePNG "статика/earth" "world/world-earth"
copySingleImagePNG "статика/fon2" "background"
copySingleImagePNG "статика/house" "world/world-tower"
copySingleImagePNG "статика/lines" "lines"
copySingleImagePNG "статика/moon" "moon"
#copySingleImagePNG "статика/Products" "station/station-products"
copySingleImagePNG "статика/Sidney" "world/world-theater"
copySingleImagePNG "статика/stars2" "stars"
copySingleImagePNG "статика/sun" "sun"
copySingleImagePNG "статика/train" "world/world-train"
copySingleImagePNG "статика/tree" "world/world-tree"
copySingleImagePNG "статика/облака" "clouds"
copySingleImagePNG "статика/buble" "popup/popup-clickme-lt"
copySingleImagePNG "статика/buble1" "popup/popup-clickme-rt"
copySingleImagePNG "статика/buble2" "popup/popup-clickme-rb"
copySingleImagePNG "статика/buble3" "popup/popup-clickme-lb"

copySingleImagePNG "Interface/back" "popup/popup-previous"
copySingleImagePNG "Interface/back2" "popup/popup-previous-hover"
copySingleImagePNG "Interface/back3" "popup/popup-previous-hold"
copySingleImagePNG "Interface/close" "popup/popup-close"
copySingleImagePNG "Interface/close2" "popup/popup-close-hover"
copySingleImagePNG "Interface/close3" "popup/popup-close-hold"
copySingleImagePNG "Interface/fon" "popup/popup-background-center"
copySingleImagePNG "Interface/fonRight" "popup/popup-background-right"
copySingleImagePNG "Interface/fonLeft" "popup/popup-background-left"
copySingleImagePNG "Interface/next" "popup/popup-next"
copySingleImagePNG "Interface/next2" "popup/popup-next-hover"
copySingleImagePNG "Interface/next3" "popup/popup-next-hold"
copySingleImagePNG "Interface/polaroid" "polaroid/polaroid-small-background"
copySingleImagePNG "Interface/polaroid_big" "polaroid/polaroid-big-background"
copySingleImagePNG "Interface/scroll" "popup/scroll-down"
copySingleImagePNG "Interface/scroll2" "popup/scroll-down-hover"
copySingleImagePNG "Interface/scroll3" "popup/scroll-down-hold"
copySingleImagePNG "Interface/up" "popup/scroll-up"
copySingleImagePNG "Interface/up2" "popup/scroll-up-hover"
copySingleImagePNG "Interface/up3" "popup/scroll-up-hold"

copySingleImageJPEG "Logo/1" "photos/java/1"
copySingleImageJPEG "Logo/1_big" "photos/java/1_big"
copySingleImageJPEG "Logo/2" "photos/webos/2"
copySingleImageJPEG "Logo/2_big" "photos/webos/2_big"
copySingleImageJPEG "Logo/3" "photos/symbian/3"
copySingleImageJPEG "Logo/3_big" "photos/symbian/3_big"
copySingleImageJPEG "Logo/4" "photos/android/4"
copySingleImageJPEG "Logo/4_big" "photos/android/4_big"
copySingleImageJPEG "Logo/5" "photos/ios/5"
copySingleImageJPEG "Logo/5_big" "photos/ios/5_big"
copySingleImageJPEG "Logo/6" "photos/bada/6"
copySingleImageJPEG "Logo/6_big" "photos/bada/6_big"

copySingleImageJPEG "Photos/1" "photos/employees/1"
copySingleImageJPEG "Photos/1_big" "photos/employees/1_big"
copySingleImageJPEG "Photos/2" "photos/hr-brand/2"
copySingleImageJPEG "Photos/2_big" "photos/hr-brand/2_big"
copySingleImageJPEG "Photos/3" "photos/developers/3"
copySingleImageJPEG "Photos/3_big" "photos/developers/3_big"
copySingleImageJPEG "Photos/4" "photos/monetization/4"
copySingleImageJPEG "Photos/4_big" "photos/monetization/4_big"
copySingleImageJPEG "Photos/5" "photos/partners/5"
copySingleImageJPEG "Photos/5_big" "photos/partners/5_big"
copySingleImageJPEG "Photos/6" "photos/rdteam/6"
copySingleImageJPEG "Photos/6_big" "photos/rdteam/6_big"
copySingleImageJPEG "Photos/7" "photos/sns/7"
copySingleImageJPEG "Photos/7_big" "photos/sns/7_big"
copySingleImageJPEG "Photos/8" "photos/development/8"
copySingleImageJPEG "Photos/8_big" "photos/development/8_big"
copySingleImageJPEG "Photos/9" "photos/allover/9"
copySingleImageJPEG "Photos/9_big" "photos/allover/9_big"
copySingleImageJPEG "Photos/10" "photos/billing/10"
copySingleImageJPEG "Photos/10_big" "photos/billing/10_big"
copySingleImageJPEG "Photos/11" "photos/countries/1"
copySingleImageJPEG "Photos/11_big" "photos/countries/1_big"
copySingleImageJPEG "Photos/12" "photos/industries/1"
copySingleImageJPEG "Photos/12_big" "photos/industries/1_big"

copySingleImageJPEG "screenshoots/1" "photos/galaxy/1"
copySingleImageJPEG "screenshoots/1_big" "photos/galaxy/1_big"
copySingleImageJPEG "screenshoots/2" "photos/catocal/2"
copySingleImageJPEG "screenshoots/2_big" "photos/catocal/2_big"
copySingleImageJPEG "screenshoots/3" "photos/jail/3"
copySingleImageJPEG "screenshoots/3_big" "photos/jail/3_big"
copySingleImageJPEG "screenshoots/4" "photos/thanks/4"
copySingleImageJPEG "screenshoots/4_big" "photos/thanks/4_big"
copySingleImageJPEG "screenshoots/5" "photos/smartive/5"
copySingleImageJPEG "screenshoots/5_big" "photos/smartive/5_big"
copySingleImageJPEG "screenshoots/6" "photos/mogames/6"
copySingleImageJPEG "screenshoots/6_big" "photos/mogames/6_big"
copySingleImageJPEG "screenshoots/7" "photos/flinter/7"
copySingleImageJPEG "screenshoots/7_big" "photos/flinter/7_big"
copySingleImageJPEG "screenshoots/8" "photos/portals/8"
copySingleImageJPEG "screenshoots/8_big" "photos/portals/8_big"
copySingleImageJPEG "screenshoots/9" "photos/pocket/9"
copySingleImageJPEG "screenshoots/9_big" "photos/pocket/9_big"
copySingleImageJPEG "screenshoots/10" "photos/warspear/10"
copySingleImageJPEG "screenshoots/10_big" "photos/warspear/10_big"

echo "Create background with reserves !!!"
echo "Create world/world-train-ie !!!"
echo "Create popup/popup-background-center-shadowless !!!"
echo "Create popup/popup-tryit !!!"