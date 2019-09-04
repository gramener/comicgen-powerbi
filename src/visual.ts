/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";

// d3
import * as d3 from "d3";

//comicgen
import * as comicgen from "comicgen";

type Selection<T> = d3.Selection<any, T, any, any>;

import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;

import { VisualSettings } from "./settings";
import comicMappings from "./mappings"
export class Visual implements IVisual {
    private target: HTMLElement;
    private settings: VisualSettings;
    private root: Selection<any>;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.target = options.element;
        // comicgen.base = "https://unpkg.com/comicgen"
        if (typeof document !== "undefined") {
            let root: Selection<any> = this.root = d3.select(this.target);
            this.root.append("g").attr("class", "newcomic")
        }
    }

    public update(options: VisualUpdateOptions) {
        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
        // console.log('Visual update', options);
        var data = options.dataViews[0].categorical.values;
        var emotiondata = data.filter(function(d){
            return d.source.roles.emotionmeasure;
        })
        var posedata = data.filter(function(d){
            return d.source.roles.posemeasure
        })

        let _comicname = this.settings.comicPoints.comicname

        var posevalue = this.settings.comicPoints.comicpose;
        if(posedata){
            var pose_value = posevalue != 'datadriven' ? posevalue : posedata[0].values[0]
        } else {
            pose_value = 'handsfolded'
        }

        var emotionvalue = this.settings.comicPoints.comicemotion;
        if(emotiondata){
            var emotion_value = emotionvalue != 'datadriven' ? emotionvalue : emotiondata[0].values[0]
        } else {
            emotion_value = 'normal'
        }
        console.log(_comicname)

        comicgen('.newcomic', {
            name: _comicname,
            emotion: comicMappings[_comicname][`emotion_${emotion_value}`],
            pose: pose_value,
            angle: 'straight',
            width: this.target.clientHeight / 1.5,
            height: this.target.clientHeight
        })
    }

    private static parseSettings(dataView: DataView): VisualSettings {
        return VisualSettings.parse(dataView) as VisualSettings;
    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}