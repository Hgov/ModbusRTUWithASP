
namespace NModbusLib.Models
{
    public interface IRtuClientSettings
    {
        RtuMasterData RtuMaster { get; set; }
        RtuSlaveData RtuSlave { get; set; }
    }
}
