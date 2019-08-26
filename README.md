# comicgen-powerbi

Dev Setup:
------------------------

1. Clone this repository
2. Install JS modules Run `npm install`
3. Start Server `pbiviz start`



How to use:
------------------------------
1. Import the package into to Power-BI Desktop
2. Create `Measure` for both `Emotion` and `Pose`
3. The `Measure` should return one of the Emotion or Pose respectively. Below is an example:
```
ProfitEmotion = IF(CALCULATE(SUM([Profit]) > 60, "smile", "tired")

SalesPose = IF(CALCULATE(SUM([Sales]) > 1000, "yuhoo", "angryfrustated")
```
4. Drag and Drop these `Measures` to respective Data Fields.
5. Goto `Format Pane` and expand `Comic Settings`
6. Select `Data Driven` in `Emotion` and `Pose` to bind the comics with data or you can override it by selecting your preferred `Emotion` and `Pose` from the dropdown. List of these poses and Emotions are available in below sections


Emotions:
------------------------------------
- Normal
- Smile
- Tired
- Wink

Poses:
-------------------------------------
- pointingright
- pointingup
- yuhoo
- superperfect
- holdinglaptop
- angryfrustrated
- handsfolded
- handsonhip
- holdingbook
- readingpaper
- thumbsup
- thinkinghmm

TODO:
-------------------------------------------
- [ ] Bug Fixes
- [ ] Add Sample Report
- [ ] Add test cases and code review
- [ ] Release it marketplace
- [ ] Add more comics.
- [ ] Add more Emotions and Poses. 
- [ ] Improve Data binding step.


*Have Fun!*
