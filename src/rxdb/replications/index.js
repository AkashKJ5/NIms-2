import { syncDesnaggingStatus } from "./desnagging_status_replications";
import { syncFixingStatus } from "./fixing_status_replications";
import { syncLayouts } from "./layout_replications";
import { syncProjectAspects } from "./project_aspects_replications";
import { syncProjectDesnagging } from "./desnagging_replications";
import { syncProjectFixing } from "./fixing_replications";
import { syncProjectItems } from "./project_item_replications";
import { syncProjectSnagging } from "./snagging_replications";
import { syncProjectStatus } from "./project_status_replications";
import { syncProjects } from "./projects_replications";
import { syncSnaggingPriority } from "./snagging_priority_replications";
import { syncSnaggingStatus } from "./snagging_status_replications";
import { syncUnitStatus } from "./unit_status_replications";
import { syncUnits } from "./unit_replications";
import { syncUsers } from "./user_replications";

/**
 * Starts synchronization with the declared collections
 *
 * @returns list of RxDB replications
 */
export const startSynchronization = (...args) => {
  const replications = [
    ...syncUsers(...args),
    ...syncProjects(...args),
    ...syncProjectStatus(...args),
    // ...syncProjectItems(...args),
    ...syncProjectAspects(...args),
    ...syncUnits(...args),
    ...syncUnitStatus(...args),
    ...syncLayouts(...args),
    ...syncProjectSnagging(...args),
    ...syncSnaggingStatus(...args),
    ...syncSnaggingPriority(...args),

    ...syncProjectFixing(...args),
    ...syncFixingStatus(...args),

    ...syncProjectDesnagging(...args),
    ...syncDesnaggingStatus(...args),
  ];

  // replications.forEach((replication) => {
  //   replication.error$.subscribe((err) => {
  //     if (err.toString() === 'TypeError: undefined is not a function') {
  //       // Ignore
  //       return;
  //     }
  //     console.debug('Error:', err);

  //     if (Array.isArray(err.innerErrors)) {
  //       err.innerErrors.forEach((ie) => {
  //         console.error('Inner error:', ie);
  //       });
  //     }
  //   });
  // });

  return replications;
};

/**
 * Cancel synchronization for all the indicated replication promises.
 *
 * @param {array} replications  list of replication states
 */
export const stopSynchronization = (replications) => {
  replications.forEach((replication) => {
    try {
      replication.cancel();
    } catch (e) {
      console.log('inside cache');
      // ignore
    }
  });
};
