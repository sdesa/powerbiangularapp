# This sample is an angular wrapper application that uses power bi embedding to embed a report.
# This is accompanied by an Azure Function app "powerbifunctionapp" that you need to have running on the default 7071 port.

Running instructions:

1. Make sure to replace the reportId and groupId variables with your specific report and group ids.
2. When running the application, use the following command to avoid CORS issues.

ng serve --proxyConfig=proxy.conf.json
