// Auto-ported from docs/design/Azores/icons.jsx — categorized icon registry.
import { ICON_PATHS, type IconName } from "./paths.js";

export type IconGroup = { name: string; icons: ReadonlyArray<IconName | string> };

export const ICON_GROUPS: ReadonlyArray<IconGroup> = [
  { name: "Navigation & layout", icons: ["home","layers","grid","dashboard","layout","sidebar","panelright","menu","menusm","list","columns","blocks","block","container","panels","rows","section"] },
  { name: "Arrows & direction", icons: ["arrowup","arrowdown","arrowleft","arrowright","arrowupright","chevup","chevdown","chevleft","chevright","chevsupdown","cornerup","cornerdown","redo","undo","refresh","rotate"] },
  { name: "Math & operators", icons: ["plus","minus","pluscircle","minuscircle","x","xcircle","divide","percent","equals","asterisk","hash","semicolon","underscore","quotation","pipe","backslash","slash"] },
  { name: "Search, filter & sort", icons: ["search","filter","sort","sortasc","sortdesc"] },
  { name: "Editing & text", icons: ["edit","pencil","pen","erase","copy","cut","paste","trash","save","save2","download","upload","share","share2","forward","reply","bold","italic","underline","strike","listord","listunord","quoteblock","quote","type","fonts","align","aligncenter","alignright","indentr","indent","outdent","translate"] },
  { name: "Files & folders", icons: ["file","filetext","filecode","fileplus","fileimage","filevideo","fileaudio","filezip","filespreadsheet","fileslides","filepdf","filemd","fileupload","filedownload","folder","folderopen","folderplus","archive","package","package2","box","notebook","binder","snippet"] },
  { name: "Communication", icons: ["mail","mailopen","inbox","send","message","messages","chat","speech","discuss","megaphone","phone","phoneoff","voicemail","bell","belloff","notification","rss","atsymbol"] },
  { name: "People & accounts", icons: ["user","users","userplus","usercheck","usercircle","crown","award","medal","trophy"] },
  { name: "Privacy & security", icons: ["lock","unlock","key","shield","shieldcheck","shieldoff","fingerprint"] },
  { name: "Accessibility", icons: ["accessibility","eyeon","captions","sign"] },
  { name: "System & settings", icons: ["settings","sliders","toggleon","toggleoff","power","poweroff","plug","cpu","chip","server","database","database2","table","wifi","wifioff","bluetooth","battery","batterycharging","volume","volumeoff","network","api","webhook","binary","cube","boxes"] },
  { name: "Time & dates", icons: ["calendar","calplus","clock","timer","hourglass","history","alarm"] },
  { name: "Charts & data", icons: ["chart","barchart","barchart2","piechart","activity","trendingup","trendingdown","target","crosshair","gauge","heartrate"] },
  { name: "Media & playback", icons: ["image","images","camera","video","play","pause","stop","skipnext","skipprev","fastforward","rewind","repeat","shuffle","mic","micoff","headphone","speaker","radio","tv","projector","scanner","printer"] },
  { name: "Weather", icons: ["sun","sunny","sunrise","sunset","moon","moonstars","cloud","cloudsun","cloudmoon","rain","cloudrainwind","cloudbolt","storm","tornado","snow","cloudsnow","cloudfog","cloudhail","wind","droplet","waves","haze","rainbow","umbrella","thermometer"] },
  { name: "Reactions & social", icons: ["heart","heartfilled","heart2","star","starhalf","thumbsup","thumbsdown","bookmark","bookmarkplus","flag","smile","frown","meh"] },
  { name: "Status & state", icons: ["info","warn","success","error","check","checkcircle","help","ban","online","offline","syncing","pending","paused","progress"] },
  { name: "Code & development", icons: ["code","code2","terminal","bracket","bracketcurly","bracketsquare","parens","git","branch","merge","pullrequest","commit","function","variable","bug","bugplay","keyboard","mouse","monitor","smartphone","tablet","laptop","laptopcode","versions","diff","fold","unfold","syntax","profiler","debug","runtime","plugin","extension","sandbox"] },
  { name: "Frameworks & platforms", icons: ["script","react","vue","angular","node","python","js","ts","java","cpp","csharp","ruby","rust","go","swift","php","html","css","json","yaml","sql","md","docker","kubernetes","aws","gcp","azure"] },
  { name: "AI & ML", icons: ["brain","robot","neural","atom","flask"] },
  { name: "Project & workflow", icons: ["kanban","todo","flowchart","milestone","gantt"] },
  { name: "Cloud", icons: ["cloudup","clouddown","cloudoff","cloudcheck"] },
  { name: "Tools & design", icons: ["tool","wrench","paintbrush","palette","pipette","spacing","margins","padding"] },
  { name: "Geo & travel", icons: ["map","mappin","navigation","compass","globe","plane","car","truck","bike","bikebold","scooter","bus","train","helicopter","boat","rocket","parking","fuel"] },
  { name: "Commerce", icons: ["shoppingcart","shoppingbag","creditcard","wallet","receipt","invoice","voucher","barcode","qr","coins","dollar","gift","discount","bagheart"] },
  { name: "Health", icons: ["pill","stethoscope","syringe","bandage","medicalcross","fitness","yoga"] },
  { name: "Food & drink", icons: ["coffee","cup","pizza","apple","utensils","chef","wine","beer"] },
  { name: "Devices & gaming", icons: ["gamecontroller","joystick","vr","watch"] },
  { name: "Sports & games", icons: ["soccer","basketball","tennis","chess","cards","dice","puzzle"] },
  { name: "Education & science", icons: ["graduation","school","library","microscope","test","dna","abacus"] },
  { name: "Nature & animals", icons: ["tree","flower","mountain","forest","fire","leaf","feather","cat","dog","bird","fish","paw"] },
  { name: "Forms", icons: ["input","radio2","radioempty","checkbox","checkboxempty","checkboxminus","upload2","download2"] },
  { name: "Misc & shapes", icons: ["sparkle","sparkles","magic","flame","zap","eye","eyeoff","drag","moreh","morev","tag","tags","link","link2","unlink","paperclip","bookopen","book","circle","square","triangle","hexagon","octagon","dot","minimize","expand","maximize","move","cross"] },
];

export const ICON_NAMES: ReadonlyArray<string> = [
  ...new Set(ICON_GROUPS.flatMap((g) => g.icons)),
];

export const ALL_ICON_NAMES: ReadonlyArray<string> = Object.keys(ICON_PATHS);
