select 
    incidents.id, 
    state, 
    injuries.name injury, 
    affectedareas.name affectedarea, 
    causes.name cause 
from incidents

join injuries on incidents.injuryid = injuries.id
join affectedareas on affectedareas.id = injuries.affectedareaid
join causes on incidents.causeid = causes.id