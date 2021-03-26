using System.Text;
using API.Security;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection IdentityServices (this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddCors(options =>
            options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:3000");
            }));

            services.AddIdentityCore<AppUser>(
                options=>options.SignIn.RequireConfirmedEmail=false
            )
               .AddEntityFrameworkStores<DataContext>()
               .AddSignInManager<SignInManager<AppUser>>()
               .AddDefaultTokenProviders();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = false,
                };

            });
            services.AddAuthorization(x=> x.AddPolicy("IsAdmin",policyBuilder=>policyBuilder.Requirements.Add(new IsAdminRequirement())));
            services.AddScoped<TokenService>();
            services.AddTransient<IAuthorizationHandler, IsAdminRequirementHandler>();

            return services;
        }
    }
}