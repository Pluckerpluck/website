<template>
  <CVExperience
    dateRange="Nov 2018 - Present"
    title="Quantitative Analyst at Fitch Ratings"
  >
    <div class="leading-none mb-[0.5rem] text-gray-600 text-sm">
      Associate Director (2022-2025) / Senior Analyst (2020-2022) / Analyst (2018-2000)
    </div>
    <div>
      Primarily specialized in the architecture, implementation, and maintenance of
      python based modelling by designing and developing a robust, highly distributed,
      modelling platform utilizing AWS service including EC2, S3, DynamoDB, Lambda and
      Step Functions. This platform underpins all new model develop within the model
      development team, covering both compute and assumption/data management, and allows
      for extreme burst capacity and high availability, scaling to thousands of parallel
      processes, achieving days of compute in minutes.
    </div>
    <div class="mt-2">
      Fully instrumented Datadog-based tracking into the modelling platform, enabling
      comprehensive monitoring, alerting, and performance metrics collection. This
      integration provides real-time insights into system health and usage patterns,
      facilitating proactive issue resolution and optimization.
    </div>
    <div class="mt-2">
      Additionally designed and worked in transitioning legacy Excel and VBA cash flow
      and asset-based models into Python (Numpy/SciPy/Pandas) with web-based UIs,
      significantly enhancing efficiency by leveraging the aforementioned modelling
      platform and allowing programmatic API access to the models.
    </div>
    <div class="text-gray-600 text-center mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div>
        Optimized model performance through highly distributed parallel processing
      </div>
      <div>
        Created re-usable python and C# libraries for use within Fitch Rating models
        e.g. validation modules, API interfaces
      </div>
      <div>
        Utilized AWS services to develop a large distributed model running platform
      </div>
      <div>Created FastAPI services (REST & GraphQL) for multiple backend systems</div>
      <div>
        Leveraged React to develop web-based interfaces for model and model tools
      </div>
      <div>Facilitated the publication of models to external clients.</div>
    </div>
  </CVExperience>
</template>
