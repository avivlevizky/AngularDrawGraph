

/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 */
/**
 * Class: mxTriangleExtended
 * 
 * Implementation of the triangle shape.
 * 
 * Constructor: mxTriangleExtended
 *
 * Constructs a new triangle shape.
 */


function mxTriangleExtended()
{
	mxActor.call(this);
};

/**
 * Extends mxActor.
 */
mxUtils.extend(mxTriangleExtended, mxActor);

/**
 * Function: redrawPath
 *
 * Draws the path for this shape.
 */
mxTriangleExtended.prototype.redrawPath = function(c, x, y, w, h)
{
	var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
	this.addPoints(c, [new mxPoint(0, h),new mxPoint(w/2, 0), new mxPoint(w, h)], this.isRounded, arcSize, true);
};




mxCellRenderer.registerShape('extendedTriangle', mxTriangleExtended);





function mxParallelogram ()
{
	mxActor.call(this);
};

/**
 * Extends mxActor.
 */
mxUtils.extend(mxParallelogram, mxActor);

/**
 * Function: redrawPath
 *
 * Draws the path for this shape.
 */
mxParallelogram.prototype.redrawPath = function(c, x, y, w, h)
{
	var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
	var dx = parseInt(h/4.0);
	this.addPoints(c, [new mxPoint(dx, 0),new mxPoint(w+dx, 0), new mxPoint(w-dx, h),new mxPoint(-dx, h)], this.isRounded, arcSize, true);
};




mxCellRenderer.registerShape('parallelogram', mxParallelogram);



function mxProcess ()
{
	mxActor.call(this);
};

/**
 * Extends mxActor.
 */
mxUtils.extend(mxProcess, mxActor);

/**
 * Function: redrawPath
 *
 * Draws the path for this shape.
 */
mxProcess.prototype.redrawPath = function(c, x, y, w, h)
{
	var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
	var dx = 12;
	this.addPoints(c, [new mxPoint(0, 0),new mxPoint(w, 0), new mxPoint(w, h),new mxPoint(0, h)], this.isRounded, arcSize, true);
	this.addPoints(c, [new mxPoint(dx, 0),new mxPoint(w-dx, 0), new mxPoint(w-dx, h),new mxPoint(dx, h)], this.isRounded, arcSize, true);

};




mxCellRenderer.registerShape('process', mxProcess);




function mxStar ()
{
	mxActor.call(this);
};

/**
 * Extends mxActor.
 */
mxUtils.extend(mxStar, mxActor);

/**
 * Function: redrawPath
 *
 * Draws the path for this shape.
 */
mxStar.prototype.redrawPath = function(c, x, y, w, h)
{
	var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
	var dx = 12;
	this.addPoints(c, [new mxPoint(0, h),new mxPoint(w/2, 0), new mxPoint(w, h)], this.isRounded, arcSize, true);
	this.addPoints(c, [new mxPoint(0, h/3),new mxPoint(w/2, 1.3*h),new mxPoint(w, h/3)], this.isRounded, arcSize, true);

};




mxCellRenderer.registerShape('star', mxStar);



mxGraphModel.prototype.graphTitle = null;

mxGraphModel.prototype.graphID = null;


