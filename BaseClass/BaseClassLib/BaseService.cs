
namespace BaseClassLib
{
    #region Using Directives

    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;

    #endregion Using Directives

    /// <summary>
    /// Base class for a service providing logger, settings, and environment data members.
    /// </summary>
    /// <typeparam name="T">The settings class.</typeparam>
    public class BaseService<T> : BaseClass<T> where T : class, new()
    {
        #region Protected Data Members

        /// <summary>
        /// The hosting environment instance.
        /// </summary>
        protected readonly IHostingEnvironment _environment;

        #endregion Protected Data Members

        #region Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseService"/> class using dependency injection.
        /// </summary>
        /// <param name="logger">The logger instance.</param>
        /// <param name="options">The setting options instance.</param>
        /// <param name="environment">The hosting environment instance.</param>
        public BaseService(ILogger<BaseService<T>> logger,
                           IOptions<T> options,
                           IHostingEnvironment environment) : base(logger, options)
        {
            _environment = environment;
            _logger?.LogDebug($"BaseService<{typeof(T)}>()");
        }

        #endregion Constructors
    }
}