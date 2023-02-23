import { Request, Response } from 'express';

const uploadFile = require('@utils/uploadFile');
const fs = require('fs');
const { PythonShell } = require('python-shell');

const baseUrl = 'http://localhost:5000/files/';

const upload = async (req: Request, res: Response) => {
  try {
    await uploadFile(req, res);

    if (req.file === undefined) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }
    // console.log("File", req.file);
    const options = {
      pythonOptions: ['-u'], // get print results in real-time
      scriptPath: 'py/',
      args: [req.file.path, req.file.filename, req.user],
    };
    return PythonShell.run('test.py', options).then((results: string[]) => {
      // script finished
      console.log('results: %j', results);

      let mess = 'Analysis complete! Please use debug log below to fix your file.';
      if (results && results[0] === 'No Errors') {
        mess = 'Analysis complete! No errors were found!';
      }
      return res.status(200).send({
        message: mess,
      });
    });
  } catch (err) {
    console.error(err);

    // if (err.code === 'LIMIT_FILE_SIZE') {
    //   return res.status(500).send({
    //     message: 'File size cannot be larger than 2MB!',
    //   });
    // }

    return res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req: Request, res: Response) => {
  const directoryPath = `${__basedir}/assets/reports/${req.user}/downloads/`;
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
  fs.readdir(directoryPath, (err: Error, files: string[]) => {
    if (err) {
      res.status(500).send({
        message: 'Unable to scan files!',
      });
    }

    const fileInfos: { name: string; url: string; date: string }[] = [];
    if (files) {
      files.forEach((file: string) => {
        const dtime = fs.statSync(directoryPath + file).mtime;
        fileInfos.push({
          name: file,
          url: baseUrl + file,
          date: dtime,
        });
      });
    }

    res.status(200).send(fileInfos);
  });
};

const download = (req: Request, res: Response) => {
  const fileName = req.params.name;
  const directoryPath = `${__basedir}/assets/reports/${req.user}/downloads/`;

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: `Could not download the file. ${err}`,
      });
    }
  });
};

const remove = (req: Request, res: Response) => {
  const fileName = req.params.name;
  const directoryPath = `${__basedir}/assets/reports/${req.user}/downloads/`;
  try {
    return fs.unlink(directoryPath + fileName, (err: Error) => {
      if (err) {
        return res.status(500).send({
          message: `Could not delete the file. ${err}`,
        });
      }

      return res.status(200).send({
        message: 'File is deleted.',
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: `Could not delete the file. ${error}`,
    });
  }
};

const removeSync = (req: Request, res: Response) => {
  const fileName = req.params.name;
  const directoryPath = `${__basedir}/assets/reports/${req.user}/downloads/`;

  try {
    fs.unlinkSync(directoryPath + fileName);

    res.status(200).send({
      message: 'File is deleted.',
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not delete the file. ${err}`,
    });
  }
};

module.exports = {
  upload,
  getListFiles,
  download,
  remove,
  removeSync,
};
