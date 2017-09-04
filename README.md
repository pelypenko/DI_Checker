Searcher of data leaks for Multi-Tenant (MT) Environment.

Story: 
If you have MT solution, you could get into data leaking between tenants with sometimes could appear on the UI level.
For instance some user from tenant1 could see some data from tenant2.
That could bring huge issues to software vendor, I would say could cause a reputation disaster.

The idea:
The idea is to use existing UI auto tests for checking MT-issues. 

For that we can divide the mass of existing UI tests (we have 1k+) between 2-3 tenants and run them in parallel. 
Every data which UI tests create (values in UI controls, backend objects and so on) during their work must be marked with tenant ID. 
Have have system IDs (SID {sid}), which currently are GUID. It should be GUID + tenantID. 
For example: UserFirstName+GUID+tenant1

In this repository implemented a Chrome Extension which silently on JS-backend analyses all incoming HTML traffic searching appearance of wrong tenant data.

The extension has config page for manual configuration of could be configured automatically by UI-test init code.
Extension logs found issues into local storage. User able to get test results manually or automatically by request from UI test teardown code.
