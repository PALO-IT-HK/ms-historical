/**
 * / - All timerange
 * /timerange/:startTime/:endTime - Specific timerange
 * startTime & endTime: HHmm (24-hr format)
 *
 * ****** Low priority for day of week ******
 * /timerange/:startTime/:endTime/dayofweek/:dows
 * /dayofweek/:dows
 */

const express = require('express');

const router = express.Router({ mergeParams: true });

const { queryUsage } = require('../controllers/usage-history-controller');
/**
 * @swagger
 * /boundary/{neLatLng}/{swLatLng}/type/{aggType}/daterange/{startDate}/{endDate}/timerange/{startTime}/{endTime}:
 *   get:
 *     description: Get usage historical data based on bounds,aggregation type,date range and time range
 *     tags:
 *       - usage
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: neLatLng
 *         description: NE coordinates
 *         default: '51.530535,-0.013258'
 *         in: path
 *         required: false
 *         type: string
 *       - name: swLatLng
 *         description: SW coordinates
 *         default: '51.519265,-0.030556'
 *         in: path
 *         required: false
 *         type: string
 *       - name: aggType
 *         description: Aggregation type, possible values ('total','by-day','by-hour')
 *         default: 'by-day'
 *         in: path
 *         required: true
 *         type: string
 *       - name: startDate
 *         description: Start of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180201'
 *         in: path
 *         required: true
 *         type: string
 *       - name: endDate
 *         description: End of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180228'
 *         in: path
 *         required: true
 *         type: string
 *       - name: startTime
 *         description: Start of the time range for usage history query in hhmm(24 hrs format), inclusive
 *         default: '1300'
 *         in: path
 *         required: false
 *         type: string
 *       - name: endTime
 *         description: End of the time range for usage history query in hhmm(24 hrs format), inclusive
 *         default: '1500'
 *         in: path
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: results
 */
/**
 * @swagger
 * /boundary/{neLatLng}/{swLatLng}/type/{aggType}/daterange/{startDate}/{endDate}:
 *   get:
 *     description: Get usage historical data based on bounds,aggregation type,date range and time range
 *     tags:
 *       - usage
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: neLatLng
 *         description: NE coordinates
 *         default: '51.530535,-0.013258'
 *         in: path
 *         required: false
 *         type: string
 *       - name: swLatLng
 *         description: SW coordinates
 *         default: '51.519265,-0.030556'
 *         in: path
 *         required: false
 *         type: string
 *       - name: aggType
 *         description: Aggregation type, possible values ('total','by-day','by-hour')
 *         default: 'by-day'
 *         in: path
 *         required: true
 *         type: string
 *       - name: startDate
 *         description: Start of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180201'
 *         in: path
 *         required: true
 *         type: string
 *       - name: endDate
 *         description: End of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180228'
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: results
 */
/**
 * @swagger
 * /top-usage/{count}/type/{aggType}/daterange/{startDate}/{endDate}/timerange/{startTime}/{endTime}:
 *   get:
 *     description: Get top usage historical data based aggregation type,date range and time range
 *     tags:
 *       - usage
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: count
 *         description: top usage e.g 5, 10 or 20
 *         default: '10'
 *         in: path
 *         required: false
 *         type: string
 *       - name: aggType
 *         description: Aggregation type, possible values ('total','by-day','by-hour')
 *         default: 'total'
 *         in: path
 *         required: true
 *         type: string
 *       - name: startDate
 *         description: Start of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180201'
 *         in: path
 *         required: true
 *         type: string
 *       - name: endDate
 *         description: End of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180228'
 *         in: path
 *         required: true
 *         type: string
 *       - name: startTime
 *         description: Start of the time range for usage history query in hhmm(24 hrs format), inclusive
 *         default: '1300'
 *         in: path
 *         required: false
 *         type: string
 *       - name: endTime
 *         description: End of the time range for usage history query in hhmm(24 hrs format), inclusive
 *         default: '1500'
 *         in: path
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: results
 */
/**
 * @swagger
 * /top-usage/{count}/type/{aggType}/daterange/{startDate}/{endDate}:
 *   get:
 *     description: Get top usage historical data based aggregation type,date range and time range
 *     tags:
 *       - usage
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: count
 *         description: top usage e.g 5, 10 or 20
 *         default: '10'
 *         in: path
 *         required: false
 *         type: string
 *       - name: aggType
 *         description: Aggregation type, possible values ('total','by-day','by-hour')
 *         default: 'total'
 *         in: path
 *         required: true
 *         type: string
 *       - name: startDate
 *         description: Start of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180201'
 *         in: path
 *         required: true
 *         type: string
 *       - name: endDate
 *         description: End of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180228'
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: results
 */
/**
 * @swagger
 * /by-district/{district}/type/{aggType}/daterange/{startDate}/{endDate}/timerange/{startTime}/{endTime}:
 *   get:
 *     description: Get top usage historical data based on district, aggregation type,date range and time range
 *     tags:
 *       - usage
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: district
 *         description: district name
 *         default: 'Waterloo'
 *         in: path
 *         required: false
 *         type: string
 *       - name: aggType
 *         description: Aggregation type, possible values ('total','by-day','by-hour')
 *         default: 'total'
 *         in: path
 *         required: true
 *         type: string
 *       - name: startDate
 *         description: Start of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180201'
 *         in: path
 *         required: true
 *         type: string
 *       - name: endDate
 *         description: End of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180228'
 *         in: path
 *         required: true
 *         type: string
 *       - name: startTime
 *         description: Start of the time range for usage history query in hhmm(24 hrs format), inclusive
 *         default: '1300'
 *         in: path
 *         required: false
 *         type: string
 *       - name: endTime
 *         description: End of the time range for usage history query in hhmm(24 hrs format), inclusive
 *         default: '1500'
 *         in: path
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: results
 */
/**
 * @swagger
 * /by-district/{district}/type/{aggType}/daterange/{startDate}/{endDate}:
 *   get:
 *     description: Get top usage historical data based on district, aggregation type,date range and time range
 *     tags:
 *       - usage
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: district
 *         description: district name
 *         default: 'Waterloo'
 *         in: path
 *         required: false
 *         type: string
 *       - name: aggType
 *         description: Aggregation type, possible values ('total','by-day','by-hour')
 *         default: 'total'
 *         in: path
 *         required: true
 *         type: string
 *       - name: startDate
 *         description: Start of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180201'
 *         in: path
 *         required: true
 *         type: string
 *       - name: endDate
 *         description: End of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180228'
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: results
 */
/**
 * @swagger
 * /bikepoints/{bikepoints}/type/{aggType}/daterange/{startDate}/{endDate}/timerange/{startTime}/{endTime}:
 *   get:
 *     description: Get top usage historical data based on bikepoints, aggregation type,date range and time range
 *     tags:
 *       - usage
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bikepoints
 *         description: bike points id/ids
 *         default: '54,167'
 *         in: path
 *         required: false
 *         type: string
 *       - name: aggType
 *         description: Aggregation type, possible values ('total','by-day','by-hour')
 *         default: 'total'
 *         in: path
 *         required: true
 *         type: string
 *       - name: startDate
 *         description: Start of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180201'
 *         in: path
 *         required: true
 *         type: string
 *       - name: endDate
 *         description: End of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180228'
 *         in: path
 *         required: true
 *         type: string
 *       - name: startTime
 *         description: Start of the time range for usage history query in hhmm(24 hrs format), inclusive
 *         default: '1300'
 *         in: path
 *         required: false
 *         type: string
 *       - name: endTime
 *         description: End of the time range for usage history query in hhmm(24 hrs format), inclusive
 *         default: '1500'
 *         in: path
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: results
 */
/**
 * @swagger
 * /bikepoints/{bikepoints}/type/{aggType}/daterange/{startDate}/{endDate}:
 *   get:
 *     description: Get top usage historical data based on bikepoints, aggregation type,date range and time range
 *     tags:
 *       - usage
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bikepoints
 *         description: bike points id/ids
 *         default: '54,167'
 *         in: path
 *         required: false
 *         type: string
 *       - name: aggType
 *         description: Aggregation type, possible values ('total','by-day','by-hour')
 *         default: 'total'
 *         in: path
 *         required: true
 *         type: string
 *       - name: startDate
 *         description: Start of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180201'
 *         in: path
 *         required: true
 *         type: string
 *       - name: endDate
 *         description: End of the date range for usage history query in yyyyMMdd, inclusive
 *         default: '20180228'
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: results
 */
router.route('*').get(queryUsage);

module.exports.router = router;
