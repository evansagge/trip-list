import Jsona from 'jsona';

const jsona = new Jsona();

export const denormalize = (entities, type, ids = null) => {
  return jsona.denormalizeReduxObject({ reduxObject: entities, entityType: type, entityIds: ids });
}

const resourceTransformer = {
  'trips': (item) => {
    const payload = {
      type: 'trips',
      id: item.id,
      destination: item.destination,
      startDate: item.startDate,
      endDate: item.endDate,
      comments: item.comments,
    };
    const includes = []

    return { payload, includes };
  }
}


export const normalize = (data) => {
  const { payload, includes } = resourceTransformer[data.type](data);

  return jsona.serialize({ stuff: payload, includeNames: includes });
}
