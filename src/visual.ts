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
    private textNode: Text;

    constructor(options: VisualConstructorOptions) {
        // console.log('Visual constructor', options);
        this.target = options.element;
        // comicgen.base = "https://unpkg.com/comicgen"
        if (typeof document !== "undefined") {
            let root: Selection<any> = this.root = d3.select(this.target);
            this.root.append("g").attr("class", "newcomic")

            const new_p: HTMLElement = document.createElement("a");
            const attHref = document.createAttribute("href");
            const attTarget = document.createAttribute("target");
            attHref.value = "https://github.com/gramener/comicgen-powerbi/blob/master/README.md#usage";
            attTarget.value = "_blank"
            this.textNode = document.createTextNode("");
            new_p.setAttributeNode(attHref);
            new_p.setAttributeNode(attTarget);
            new_p.appendChild(this.textNode);
            this.target.appendChild(new_p);
        }
    }

    private validate(data){
        var res = {
            comicname: this.settings.comicPoints.comicname,
            emotion: 'normal', pose: 'handsfolded',
            error: false, message: 'success'
        }
        var mapSettings = {
            emotion: this.settings.comicPoints.comicemotion,
            pose: this.settings.comicPoints.comicpose,
        }
        var measures = ['pose', 'emotion']

        measures.forEach(function(m){
            var datapoint = data.filter(function(d){
                return d.source.roles[`${m}measure`]
            })
            if(mapSettings[m] == 'datadriven') {
                if(datapoint.length) {
                    var val = datapoint[0].values[0].toString().toLowerCase()
                    if(comicMappings[res.comicname][`${m}_${val}`] !== undefined) {
                        res[m] = val
                    } else {
                        res.error = true,
                        res.message = 'Invalid Emotion/Pose value in the measure, Please see usage'
                    }
                } else {
                    res.error = true
                    res.message = 'Emotion/Pose data field is empty, Please see usage'
                }
            } else {
                res[m] = mapSettings[m]
            }
        })
        return res
    }

    public update(options: VisualUpdateOptions) {
        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
        // console.log('Visual update', options);
        var data = options.dataViews[0].categorical.values;
        var getComic = this.validate(data)

        if(getComic.error) {
            this.textNode.textContent = (getComic.message);
            d3.select('.newcomic').style("display", "none")
        } else {
            d3.select('.newcomic').style("display", "block")
            this.root.attr('title', "Emotion: " + getComic.emotion  + ", Pose: " + getComic.pose)
        }

        comicgen('.newcomic', {
            name: getComic.comicname,
            emotion: comicMappings[getComic.comicname][`emotion_${getComic.emotion}`],
            pose: comicMappings[getComic.comicname][`pose_${getComic.pose}`],
            angle: 'straight',
            mirror: this.settings.comicPoints.comicmirror,
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