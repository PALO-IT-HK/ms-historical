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

const usageHistory = require('../controllers/usageHistoryController');
/**
 * @swagger
 * /boundary/{neLatLng}/{swLatLng}/type/{aggType}/daterange/{startDate}/{endDate}/timerange/{startHour}/{endHour}:
 *   get:
 *     description: Get usage historical data based on bounds,aggregation type,date range and time range
 *     tags:
 *       - weather
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
 *       - name: startHour
 *         description: Start of the time range for usage history query in hhmm(24 hrs format), inclusive
 *         default: '1300'
 *         in: path
 *         required: false
 *         type: string
 *       - name: endHour
 *         description: End of the time range for usage history query in hhmm(24 hrs format), inclusive
 *         default: '1500'
 *         in: path
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: results
 */
router.route('*').get(usageHistory.query);

module.exports.router = router;
