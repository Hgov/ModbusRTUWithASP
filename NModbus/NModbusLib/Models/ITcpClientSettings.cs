
namespace NModbusLib.Models
{
    public interface ITcpClientSettings
    {
        TcpMasterData TcpMaster { get; set; }
        TcpSlaveData TcpSlave { get; set; }
    }
}
