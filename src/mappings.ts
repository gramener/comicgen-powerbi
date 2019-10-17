interface IComic {
    emotion_normal: string;
    emotion_laugh: string;
    emotion_sad: string;
    emotion_angry: string;
    emotion_worried: string;
    emotion_surprised: string;
    emotion_wink: string;
    pose_pointingright: string;
    pose_pointingup: string;
    pose_yuhoo: string;
    pose_superperfect: string;
    pose_holdinglaptop: string;
    pose_angryfrustrated: string;
    pose_handsfolded: string;
    pose_handsonhip: string;
    pose_holdingbook: string;
    pose_readingpaper: string;
    pose_thumbsup: string;
    pose_thinkinghmm: string;
 }

let comicMappings: { [id: string]: IComic; } = {
    "dey": {
        emotion_normal: "normal",
        emotion_laugh: "smile",
        emotion_sad: "tired",
        emotion_angry: "shocked",
        emotion_worried: "shocked",
        emotion_surprised: "hmmconfused",
        emotion_wink: "wink",
        pose_pointingright: "pointingright",
        pose_pointingup: "pointingup",
        pose_yuhoo: "yuhoo",
        pose_superperfect: "superperfect",
        pose_holdinglaptop: "holdinglaptop",
        pose_angryfrustrated: "angryfrustrated",
        pose_handsfolded: "handsfolded",
        pose_handsonhip: "handsonhip",
        pose_holdingbook: "holdingbook",
        pose_readingpaper: "readingpaper",
        pose_thumbsup: "thumbsup",
        pose_thinkinghmm: "thinkinghmm"
    },
    "dee": {
        emotion_normal: "smile",
        emotion_laugh: "smilehappy",
        emotion_sad: "sad",
        emotion_angry: "angryfrustrated",
        emotion_worried: "worried",
        emotion_surprised: "angryshouting",
        emotion_wink: "wink",
        pose_pointingright: "pointingright",
        pose_pointingup: "pointingup",
        pose_yuhoo: "yuhoo",
        pose_superperfect: "superperfect",
        pose_holdinglaptop: "holdinglaptop",
        pose_angryfrustrated: "angryfrustrated",
        pose_handsfolded: "handsfolded",
        pose_handsonhip: "handsonhip",
        pose_holdingbook: "holdingbook",
        pose_readingpaper: "readingpaper",
        pose_thumbsup: "thumbsup",
        pose_thinkinghmm: "thinkinghmm"
    },
 };
export default comicMappings;
