import { Request, Response } from 'express';

const User = require('@model/User');

const verifyUserReportAccess = async (req: Request, res: Response) => {
  const { user, body } = req;
  const userData = await User.findOne({ username: user });
  if (!userData.reports.includes(body.reportName)) {
    res.status(403).json({ success: true, error: false });
  } else {
    res.status(200).json({ success: false, error: true });
  }
};

module.exports = { verifyUserReportAccess };
