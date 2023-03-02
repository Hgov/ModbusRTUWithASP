
namespace NModbusTCP.Pages
{
    #region Using Directives

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.RazorPages;
    using System.Diagnostics;

    #endregion

    /// <summary>
    /// Default ASP.NET core error handling page.
    /// </summary>
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public class ErrorModel : PageModel
    {
        #region Public Properties

        /// <summary>
        /// The current request ID.
        /// </summary>
        public string RequestId { get; set; }

        /// <summary>
        /// Flag indicating to show the current request ID.
        /// </summary>
        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);

        #endregion

        #region Public Methods

        /// <summary>
        /// Initializes the state needed for the page.
        /// </summary>
        public void OnGet()
        {
            RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
        }

        #endregion
    }
}
