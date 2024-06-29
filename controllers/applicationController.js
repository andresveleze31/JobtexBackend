import Application from "../models/Application.js";
import Job from "../models/Job.js";

async function createApplication(req, res){

    try {
        const application = await Application.create({
          job_id: req.body.job_id,
          candidate_id: req.body.candidate_id,
          state_id: "65a480a91228156ecfc6ec33",
        });        
        res.json(application);
    } catch (error) {
        return res.status(403).json({ msg: error.message });
        
    }

}

async function getApplication(req, res){

     try {
       const application = await Application.findOne({
         job_id: req.query.job_id,
         candidate_id: req.query.candidate_id,
       });
       res.json(application);
       console.log(application);
     } catch (error) {
       return res.status(403).json({ msg: error.message });
     }
}

async function getApplicationCandidate(req, res){
    const {id} = req.params;
    try {
      const applications = await Application.find({
        candidate_id: id,
      })
        .populate({
          path: "candidate_id",
          populate: {
            path: "qualification_id language_id categorie_id", // Agrega los campos que deseas popular aquí
          },
        })
        .populate({
          path: "job_id",
          populate: {
            path: "categorie_id employer_id industry_id location_id qualification_id salaryType type_id", // Agrega los campos que deseas popular aquí
          },
        })
        .populate("state_id");
      res.json(applications);
    } catch (error) {
      return res.status(403).json({ msg: error.message });
    }
}

async function deleteApplication(req, res) {
  const { id } = req.params;

  try {
    const appDeleted = await Application.findOneAndDelete({ _id: id });
    if (!appDeleted) {
      return res.status(404).json({ error: "Job Not Found" });
    }
    return res.json(appDeleted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getJobsAndApplicationsByEmployer = async (req, res) => {
  
  const {id} = req.params;

  try {
    // Obtener todos los trabajos del employer
    const jobs = await Job.find({ employer_id: id });

    // Obtener todas las aplicaciones a esos trabajos
    const applications = await Application.find({
      job_id: { $in: jobs.map((job) => job._id) },
    })
      .populate("job_id")
      .populate({
        path: "candidate_id",
        populate: {
          path: "location_id", // Agrega los campos que deseas popular aquí
        },
      })
      .populate("state_id");

    return res.json(applications);
  } catch (error) {
    console.error("Error al obtener trabajos y aplicaciones:", error);
    throw error;
  }
};

async function deleteApplicationsJob(req, res){

  const {id} = req.params;

    try {
      // Delete all applications with the specified job_id
      const deletedApplications = await Application.deleteMany({ job_id: id });

      if (deletedApplications.deletedCount === 0) {
        return res
          .status(404)
          .json({ error: "No Applications Found for the Job" });
      }

      return res.json({
        message: `Successfully deleted ${deletedApplications.deletedCount} applications for the job`,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

}

async function updateStateApplication(req, res) {

   const { candidate_id } = req.params;
   const {job_id} = req.params

   try {
     const appUpdated = await Application.findOneAndUpdate(
       { candidate_id: candidate_id, job_id: job_id },
       {
         ...req.body,
       }
     );

     if (!appUpdated) {
       return res.status(404).json({ error: "Candidate Not Found" });
     }

     return res.json(appUpdated);
   } catch (error) {
     res.status(400).json({ error: error.message });
   }

}

export {
  createApplication,
  getApplication,
  getApplicationCandidate,
  deleteApplication,
  getJobsAndApplicationsByEmployer,
  updateStateApplication,
  deleteApplicationsJob,
};