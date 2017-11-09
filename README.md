Searcher of user data leaks on Multi-Tenant (MT) Environment.

Story: 
If you have web-based MT solution, you could get into a problem of users data leaking between tenants which could appear even on the UI level. For instance, a user from tenant1 could see some data from tenant2.
That could bring huge issues to a software vendor. I would say that could cause a reputation disaster.

The idea was to use existing UI auto tests for checking MT-issues. 

For that, we can run in parallel the mass of existing UI tests (we have 1.5k+) against 2-3 tenants. 
Every data which create UI tests during their work (values in UI controls, backend objects and so on) must be marked with tenant ID. 
For this, we have System IDs (SID {sid}), which currently are GUIDs. They should be GUID + tenantID. 
For example: "Test user " + GUID + " " + tenant1.

In this repository implemented a Chrome Extension which silently on JS-backend analyses all incoming HTML traffic searching for appearance of wrong tenantIDs.

- The extension has Config page for manual configuration or could be configured, the same as activated/deactivated, automatically by UI-tests init code.
- The extension logs found issues into HTML5 Local Storage. 
- User is able to check test results manually (click on the Chrome Extention) or we can make special UI test which could get the results by HTTP request and analyze them automatically.
