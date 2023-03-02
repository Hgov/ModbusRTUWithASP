
namespace NModbusRTU.Pages
{
    #region Using Directives

    using Microsoft.AspNetCore.Mvc.RazorPages;

    #endregion

    /// <summary>
    /// 
    /// </summary>
    public class AboutModel : PageModel
    {
        #region Public Properties

        /// <summary>
        /// 
        /// </summary>
        public string Message { get; set; }

        #endregion

        #region Public Methods

        /// <summary>
        /// 
        /// </summary>
        public void OnGet()
        {
            Message = "Your application description page.";
        }

        #endregion
    }
}
