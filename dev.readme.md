@startuml

start

repeat :node;
  : instru ]
  :Visitor;
backward:This is backward]
repeat while (more data?)
: instru ]
stop

@enduml